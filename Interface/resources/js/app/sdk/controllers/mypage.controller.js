define([

], function() {

    var mypageController = function mypageController($scope, taskService, $location) {

        $scope.loading = true;
        $scope.openProjects = [];

        $scope.goToEditor = function goToEditor(taskData) {
            alert('Open task with id:' + taskData.id + ' on page with id:' + taskData.nextAvailablePageId);
        };

        $scope.goToStatistics = function goToStatistics(taskData) {
            alert('Open statistics for test with id:' + taskData.id);
        };

        taskService.getTasks().then(function(response) {
            $scope.openTasks = response;
        }).finally(function() {
            $scope.loading = false;
        });


    };

    return mypageController;

});