export default [function () {
    return {
        restrict: 'E',
        scope: {},
        template: require('./edit-profile.directive.tpl.html'),
        controller: ['$scope', 'userService', 'authService', function ($scope, userService, authService) {
            $scope.loading = true;
            $scope.error = false;

            $scope.email = {
                name: 'email',
                value: undefined,
                editing: false,
                updating: false,
                error: false
            };

            $scope.nickname = {
                name: 'nickname',
                value: undefined,
                editing: false,
                updating: false,
                error: false
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
                field.editing = false;
                field.updating = true;
                userService.updateUserProfile(attr)
                .then(function() {
                    field.error = false;
                })
                .catch(function(err) {
                    field.error = true;
                    field.value = field.oldValue;
                    $scope.$apply();
                })
                .finally(function() {
                    field.updating = false;
                    $scope.$apply();
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