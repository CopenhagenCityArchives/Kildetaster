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
        controller: ['$element', '$scope', '$timeout', 'userService', 'authService', function ($element, $scope, $timeout, userService, authService) {
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
                $scope.oldValue = $scope.value;
                $timeout(function() {
                    $scope.editing = true;
                    $element.find('#edit-profile-' + $scope.field + '-input').focus();
                });
            }

            $scope.cancel = function() {
                $scope.value = $scope.oldValue;

                $timeout(function() {
                    $scope.editing = false;
                    $element.find('#' + $scope.field + '-edit-btn').focus();
                });
            }

            $scope.save = function() {
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
                .catch(function() {
                    $scope.error = true;
                    $scope.value = $scope.oldValue;
                })
                .finally(function() {
                    $timeout(function() {
                        $scope.updating = false;
                        $element.find('#' + $scope.field + '-edit-btn').focus();
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