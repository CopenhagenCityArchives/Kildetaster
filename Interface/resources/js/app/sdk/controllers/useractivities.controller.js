define([

], function() {

    var useractivitiesController = /*@ngInject*/ function mypageController($scope, tokenService, EDITOR_URL, userService, taskService) {

        $scope.loading = false;
        $scope.activities = [];
        $scope.tasks = [];

        $scope.userId = null;

        $scope.EDITORURL = EDITORURL;

        $scope.init = function() {

            $scope.loading = true;

            taskService.getTasks().then(function (response) {
                response.forEach(function (task) {
                    $scope.tasks[task.id] = task;
                });
                userService.getUserActivities().then(function (response) {
                    $scope.activities = response.filter(function (activity) {
                        return activity.task_unit_pages_done < activity.unit_pages;
                    });
                }).finally(function () {
                    $scope.loading = false;
                });
            });
        };

        //Initialize logic
        $scope.init();

    };

    return useractivitiesController;

});
