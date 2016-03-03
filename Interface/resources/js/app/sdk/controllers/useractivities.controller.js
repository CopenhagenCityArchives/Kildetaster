define([

], function() {

    var useractivitiesController = /*@ngInject*/ function mypageController($scope, tokenService, EDITORURL, userService) {

        $scope.loading = false;
        $scope.activities = [];

        $scope.userId = null;

        tokenService.requestToken().then(function(response) {
            var data = response.tokenData;
            $scope.userId = data.user_id;
            //Initialize logic
            $scope.init();
        });

        /**
        * Send browser to the editor on the page and task specified in the activity
        */
        $scope.goToEditor = function(data) {
           window.location.href = EDITORURL + '/#/task/' + data.task_id + '/page/' + data.page_id
        };

        $scope.init = function() {

            $scope.loading = true;

            //Get error reports for a given user
            userService.getUserActivities({
                user_id: $scope.userId
            }).then(function(response) {
                $scope.activities = response;
            }).finally(function() {
                $scope.loading = false;
            });
        };

    };

    return useractivitiesController;

});
