define([

], function () {

    var useractivitiesController = /*@ngInject*/ function mypageController($scope, tokenService, EDITORURL, userService, taskService) {

        $scope.loading = false;
        $scope.activities = [];
        $scope.tasks = {};

        $scope.userId = null;

        tokenService.requestToken().then(function (response) {
            var data = response.tokenData;
            $scope.userId = data.user_id;
            //Initialize logic
            $scope.init();
        });

        $scope.EDITORURL = EDITORURL;

        $scope.init = function () {

            $scope.loading = true;



            taskService.getTasks().then(function (response) {
                response.forEach(function (task) {
                    $scope.tasks[task.id] = task;
                });
                userService.getUserActivities({
                    user_id: $scope.userId
                }).then(function (response) {
                    $scope.activities = response.filter(function (activity) {
                        return activity.task_unit_pages_done < activity.unit_pages;
                    });
                }).finally(function () {
                    $scope.loading = false;
                });
            });

        };

    };

    return useractivitiesController;

});
