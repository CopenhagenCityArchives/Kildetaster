export default [function () {
    return {
        restrict: 'E',
        scope: {},
        template: require('./edit-profile.directive.tpl.html'),
        controller: ['$scope', '$element', 'userService', function($scope, $element, userService) {
            $scope.editPassword = false;
            $scope.passwordValue = undefined;
            $scope.passwordRepeatValue = undefined;
            $scope.passwordChanged = false;
            $scope.passwordError = false;
            $scope.passwordUpdating = false;
            
            $scope.submitPassword = function(event) {
                $scope.passwordChanged = false;
                $scope.passwordError = false;
                $scope.passwordUpdating = true;

                if (event.target.checkValidity()) {
                    userService.updateUserProfile({'password': this.passwordValue})
                    .then(function() {
                        $scope.passwordChanged = true;
                    })
                    .catch(function(err) {
                        $scope.passwordError = true;
                    })
                    .finally(function() {
                        $scope.editPassword = false;
                        $scope.passwordUpdating = false;
                    })
                }
            }

            $scope.checkRepeat = function() {
                var elem1 = $element.find('#edit-profile-input-password-1')[0];
                var elem2 = $element.find('#edit-profile-input-password-2')[0];
                if (this.passwordRepeatValue && this.passwordValue == this.passwordRepeatValue) {
                    elem1.setCustomValidity("");
                    elem2.setCustomValidity("");
                } else {
                    elem1.setCustomValidity("De to kodeord skal være ens.");
                    elem2.setCustomValidity("De to kodeord skal være ens.");
                }
            }
        }]
    }
}]