export default [function() {
    return {
        restrict: 'E',
        scope: {
            field: '@',
            inputType: '@',
            placeholder: '@',
            label: '@'
        },
        template: require('./edit-profile-form.directive.tpl.html'),
        controller: ['$scope', '$timeout', 'userService', 'authService', function ($scope, $timeout, userService, authService) {
            $scope.loading = true;
            $scope.error = false;            
            $scope.editing = false;
            $scope.updating = false;

            $scope.value = undefined;

            $scope.submit = function() {
                if (!$scope.editing && !$scope.updating) {
                    $scope.edit();
                } else if ($scope.editing) {
                    $scope.save();
                }
            }

            $scope.edit = function() {
                if (!$scope.editing) {
                    $scope.editing = true;
                    $scope.oldValue = $scope.value;
                }
            }

            $scope.cancel = function() {
                if ($scope.editing) {
                    $scope.editing = false;
                    $scope.value = $scope.oldValue;
                }
            }

            $scope.save = function() {
                if (!$scope.editing) {
                    return;
                }

                var attr = {};
                attr[$scope.field] = $scope.value;

                $scope.editing = false;
                $scope.updating = true;
                $scope.error = false;

                userService.updateUserProfile(attr)
                .then(function() {
                    $scope.success = true;
                    $scope.oldValue = $scope.value;
                })
                .catch(function(err) {
                    $scope.error = true;
                    $scope.value = $scope.oldValue;
                })
                .finally(function() {
                    $timeout(function() {
                        $scope.updating = false;
                    });
                })
            }

            authService.getUser()
            .then(function (user) {
                $scope.value = user[$scope.field];
            })
            .catch(function () {
                $scope.error = true;
            })
            .finally(function () {
                $timeout(function() {
                    $scope.loading = false;
                });
            })
        }]
    }
}]