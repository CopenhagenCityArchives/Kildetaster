export default [function () {
    return {
        restrict: 'E',
        scope: {},
        template: require('./edit-profile.directive.tpl.html'),
        controller: ['$scope', '$element', '$timeout', 'authService', 'userService', function($scope, $element, $timeout, authService, userService) {
            $scope.user = null;

            $scope.loading = true;
            $scope.saving = false;
            $scope.editing = false;
            $scope.errorSaving = null;
            $scope.successSaving = null;

            $scope.nickname = null;
            $scope.email = null;
            $scope.emailRepeat = null;
            $scope.password = null;
            $scope.passwordRepeat = null;

            $scope.edit = function() {
                $scope.editing = true;

                $scope.nickname = $scope.user.nickname;
                $scope.email = $scope.user.email;
                $scope.emailRepeat = $scope.user.email;
                $scope.errorSaving = "";
                $scope.successSaving = "";
            }

            $scope.cancel = function() {
                $scope.editing = false;
                $scope.errorSaving = "";
                $scope.successSaving = "";
            }

            $scope.submit = function() {
                if (!$element.find('form')[0].checkValidity()) {
                    return;
                }

                var profile = {};
                if (this.nickname && this.nickname != this.user.nickname) {
                    profile.nickname = this.nickname;
                }
                if (this.password) {
                    profile.password = this.password;
                }
                if (this.email && this.email != this.user.email) {
                    profile.email = this.email;
                }
                if (!profile.nickname && !profile.password && !profile.email) {
                    return;
                }


                $scope.errorSaving = "";
                $scope.successSaving = "";
                this.saving = true;

                userService.updateUserProfile(profile)
                .then(function(result) {
                    $scope.user = result.data;
                    $scope.successSaving = "Brugeroplysningerne blev gemt!";
                    $scope.password = null;
                    $scope.passwordRepeat = null;
                })
                .catch(function(err) {
                    if (err.status == 400 && err.data && err.data.message == 'Username already exists') {
                        $scope.errorSaving = "Brugeroplysninger blev ikke gemt. Brugernavnet er optaget."
                    } else {
                        $scope.errorSaving = "Brugeroplysninger blev ikke gemt."
                    }
                })
                .finally(function() {
                    $scope.$apply(function() {
                        $scope.editing = false;
                        $scope.saving = false;
                    });
                })
            }

            $scope.checkEmailRepeat = function() {
                if (this.email != this.emailRepeat) {
                    $element.find('#edit-profile-email')[0].setCustomValidity('De to e-mailadresser skal være ens.');
                    $element.find('#edit-profile-email-repeat')[0].setCustomValidity('De to e-mailadresser skal være ens.');
                } else {
                    $element.find('#edit-profile-email')[0].setCustomValidity('');
                    $element.find('#edit-profile-email-repeat')[0].setCustomValidity('');
                }
            }

            $scope.checkPasswordRepeat = function() {
                if ((this.password || this.passwordRepeat) && this.password != this.passwordRepeat) {
                    $element.find('#edit-profile-password')[0].setCustomValidity('De to kodeord skal være ens.');
                    $element.find('#edit-profile-password-repeat')[0].setCustomValidity('De to kodeord skal være ens.');
                } else {
                    $element.find('#edit-profile-password')[0].setCustomValidity('');
                    $element.find('#edit-profile-password-repeat')[0].setCustomValidity('');
                }
            }
            
            
            authService.getUser()
            .then(function (user) {
                $scope.user = user;
            })
            .catch(function () {
                $scope.error = true;
            })
            .finally(function () {
                $scope.loading = false;
            })
        }]
    }
}]