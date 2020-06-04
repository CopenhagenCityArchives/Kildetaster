define([

], function() {

    var errorsController = /*@ngInject*/ function mypageController($scope, tokenService, userService, errorService, helpers, EDITORURL) {

        $scope.loading = false;
        $scope.errorList = [];

        $scope.userId = null;

        $scope.isSuperUser = false;

        //Object to store selections from dropdown filters
        $scope.filtered = {};

        //The config object to use for filtereing the errorList
        $scope.selectedFilter = {};

        userService.getUserInfo()
        .then(function(response) {

            //Store the users userId
            $scope.userId = response.user_id;

            //Determine if the user is a superuser of any task (arary contains something)
            $scope.isSuperUser = response.super_user_tasks.length > 0;

            //Initialize logic
            $scope.init({});
        });

        $scope.$watch('errorList', function(newval) {
            if ($scope.isSuperUser === true) {
                $scope.userList = helpers.uniqueBy(newval, function(item) {
                    return item.username
                });

                $scope.fieldList = helpers.uniqueBy(newval, function(item) {
                    return item.label;
                })
            }

        });

        $scope.dropdownChanged = function(prop, value) {

            $scope.selectedFilter = {};

            if (prop && value !== null) {
                $scope.selectedFilter[prop] = value;
            }
        };

        $scope.$watch('filtered.username', function(newval) {

            if (newval && newval !== null) {
                //Clear the other dropdown
                $scope.filtered.label = null;
            }

        });

        $scope.$watch('filtered.label', function(newval) {

            if (newval && newval !== null) {
                //Clear the other dropdown
                $scope.filtered.username = null;
            }

        });

        $scope.goToEditor = function(errorData) {
            window.open(EDITORURL + '/#/task/' + errorData.tasks_id + '/page/' + errorData.pages_id + '/post/' + errorData.posts_id, '_blank');
        };

        $scope.init = function(options) {

            $scope.loading = true;

            //Get error reports for a given user
            errorService.getErrorReports({
                relevant_user_id: $scope.userId
            }).then(function(response) {
                $scope.errorList = response;
            }).finally(function() {
                $scope.loading = false;
            });
        };

    };

    return errorsController;

});
