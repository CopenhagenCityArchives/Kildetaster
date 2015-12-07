define([

], function() {

    var mypageController = function mypageController($scope, taskService) {

        $scope.loading = true;
        $scope.openProjects = [];

        $scope.goToEditor = function goToEditor(taskData) {
            window.location.href = 'http://localhost:1508/#/task/' + taskData.id + '/page/' + taskData.nextAvailablePageId;
        };

        $scope.goToStatistics = function goToStatistics(taskData) {
            alert('Open statistics for task with id:' + taskData.id);
        };

        taskService.getTasks().then(function(response) {
            $scope.openTasks = response;
        }).finally(function() {
            $scope.loading = false;
        });


    };

    return mypageController;

});