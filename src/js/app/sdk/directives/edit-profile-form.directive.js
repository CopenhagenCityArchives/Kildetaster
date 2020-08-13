export default [function() {
    return {
        restrict: 'E',
        scope: {
            field: '@',
            inputType: '@',
            placeholder: '@',
            label: '@',
            errorCallback: '&',
            successCallback: '&'
        },
        template: require('./edit-profile-form.directive.tpl.html'),
        controller: ['$element', '$scope', '$timeout', 'userService', 'authService', function ($element, $scope, $timeout, userService, authService) {
            $scope.error = false;
            $scope.state = "loading";
            $scope.value = undefined;

            $scope.submit = function() {
                switch ($scope.state) {
                    case "default":
                        $scope.edit();
                        break;
                    case "editing":
                        $scope.save();
                        break;
                }
            }

            $scope.edit = function() {
                $scope.oldValue = $scope.value;
                $scope.state = "editing";

                $timeout(function() {
                    var elem = $element.find('#edit-profile-input-' + $scope.field);
                    elem.focus();
                });
            }

            $scope.cancel = function() {
                $scope.value = $scope.oldValue;
                $scope.state = "default";

                $timeout(function() {
                    $element.find('#edit-profile-edit-button-' + $scope.field).focus();
                });
            }

            $scope.save = function() {
                var attr = {};
                attr[$scope.field] = $scope.value;

                $scope.state = "loading";
                $scope.error = false;

                userService.updateUserProfile(attr)
                .then(function(val) {
                    $scope.oldValue = $scope.value;
                    $scope.successMessage = $scope.successCallback()(val);
                })
                .catch(function(err) {
                    $scope.error = true;
                    $scope.value = $scope.oldValue;
                    $scope.errorMessage = $scope.errorCallback()(err);
                })
                .finally(function() {
                    $scope.state = "default";

                    $timeout(function() {
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
                    $scope.state = "default";
                });
            })
        }]
    }
}]