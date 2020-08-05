export default [function () {
    return {
        restrict: 'E',
        scope: {},
        template: require('./edit-profile.directive.tpl.html'),
        controller: ['$scope', 'authService', function ($scope, authService) {
            $scope.loading = true;
            $scope.error = false;

            $scope.email = {
                name: 'email',
                value: undefined,
                editing: false
            };

            $scope.nickname = {
                name: 'nickname',
                value: undefined,
                editing: false
            };

            $scope.password = {
                name: 'password',
                value: undefined,
                editing: false
            };

            $scope.edit = function(field) {
                if (field.editing) {
                    return;
                }

                field.editing = true;
                field.oldValue = field.value;
            }

            $scope.cancel = function(field) {
                if (!field.editing) {
                    return;
                }

                field.editing = false;
                field.value = field.oldValue;
            }

            $scope.save = function(field) {
                var attr = {};
                attr[field.name] = field.value;
                authService.updateUser(attr)
                .then(function() {
                    console.log("updated!");
                })
                .catch(function(err) {
                    console.error("did not update", err);
                })
            }

            authService.getUser()
                .then(function (user) {
                    $scope.email.value = user.email;
                    $scope.nickname.value = user.nickname;
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