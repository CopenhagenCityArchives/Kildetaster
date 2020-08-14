export default [function () {
    return {
        restrict: 'E',
        scope: {},
        template: require('./edit-profile.directive.tpl.html'),
        controller: ['$scope', '$element', '$timeout', 'authService', 'userService', function($scope, $element, $timeout, authService, userService) {
            $scope.user = null;
            $scope.loading = true;
            $scope.editing = false;

            $scope.nickname = {
                name: 'nickname',
                value: null,
                saving: false,
                errorText: null,
                successText: null,
                getErrorText(err) {
                    if (err && err.data && err.data.message == 'Username already exists') {
                        return "Brugernavnet fandtes allerede.";
                    } else {
                        return "Brugernavnet blev ikke opdateret.";

                    }
                },
                getSuccessText() {
                    return "Brugernavnet blev opdateret!";
                }
            };

            $scope.email = {
                name: 'email',
                value: null,
                repeat: null,
                saving: false,
                errorText: null,
                successText: null,
                getErrorText() {
                    return "E-mailadressen blev ikke opdateret.";
                },
                getSuccessText() {
                    return "E-mailadressen blev opdateret!";
                },
                validate() {
                    if (this.value != this.repeat) {
                        $element.find('#edit-profile-email')[0].setCustomValidity('De to e-mailadresser skal være ens.');
                        $element.find('#edit-profile-email-repeat')[0].setCustomValidity('De to e-mailadresser skal være ens.');
                        return false;
                    } else {
                        $element.find('#edit-profile-email')[0].setCustomValidity('');
                        $element.find('#edit-profile-email-repeat')[0].setCustomValidity('');
                        return true;
                    }
                },
                check() {
                    this.validate();
                }
            };

            $scope.password = {
                name: 'password',
                value: null,
                repeat: null,
                saving: false,
                errorText: null,
                successText: null,
                getErrorText() {
                    return "Kodeordet blev ikke opdateret.";
                },
                getSuccessText() {
                    return "Kodeordet blev opdateret!";
                },
                validate() {
                    if ((this.value || this.repeat) && this.value != this.repeat) {
                        $element.find('#edit-profile-password')[0].setCustomValidity('De to kodeord skal være ens.');
                        $element.find('#edit-profile-password-repeat')[0].setCustomValidity('De to kodeord skal være ens.');
                        return false;
                    } else if (!this.value && !this.repeat) {
                        $element.find('#edit-profile-password')[0].setCustomValidity('');
                        $element.find('#edit-profile-password-repeat')[0].setCustomValidity('');
                        return false;
                    } else {
                        $element.find('#edit-profile-password')[0].setCustomValidity('');
                        $element.find('#edit-profile-password-repeat')[0].setCustomValidity('');
                        return true;
                    }
                },
                check() {
                    this.validate();
                }
            };

            $scope.edit = function() {
                $element.find('input').each(function(_, input) {
                    input.setCustomValidity('');
                });
                $element.find('#edit-profile-password-form')[0].reset();
                
                $scope.editing = true;
                $scope.nickname.value = $scope.user.nickname;
                $scope.email.value = $scope.user.email;
                $scope.email.repeat = $scope.user.email;
                $scope.password.value = null;
                $scope.password.repeat = null;
                $scope.nickname.successText = null;
                $scope.nickname.errorText = null;
                $scope.email.successText = null;
                $scope.email.errorText = null;
                $scope.password.successText = null;
                $scope.password.errorText = null;
            }

            $scope.cancel = function() {
                $scope.editing = false;
            }

            $scope.submit = function(event, field, comparison) {
                if (!event.target.checkValidity()) {
                    return;
                }

                if (field.validate && !field.validate()) {
                    return;
                }

                var profile = {};
                if (field.value != comparison) {
                    profile[field.name] = field.value;
                } else {
                    return;
                }
                field.saving = true;
                field.errorText = null;
                field.successText = null;

                userService.updateUserProfile(profile)
                .then(function(result) {
                    $scope.user = result.data;
                    field.successText = field.getSuccessText();
                })
                .catch(function(err) {
                    field.errorText = field.getErrorText(err);
                })
                .finally(function() {
                    $scope.$apply(function() {
                        field.saving = false;
                    });
                })
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