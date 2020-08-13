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
                this.passwordChanged = false;
                this.passwordError = false;
                this.passwordUpdating = true;

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
                var elem = $element.find('#edit-profile-input-password-2')[0];
                if (this.passwordRepeatValue && this.passwordValue == this.passwordRepeatValue) {
                    elem.setCustomValidity("");
                } else {
                    elem.setCustomValidity("De to kodeord skal være ens.");
                }
            }
        }]
    }
}]