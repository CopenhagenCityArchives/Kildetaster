define([

], function() {

    var mypageController = /*@ngInject*/ function mypageController($scope, taskService, EDITORURL) {

        $scope.loading = true;
        $scope.openProjects = [];

        $scope.goToEditor = function goToEditor(taskData) {
            window.location.href = EDITORURL + '/#/task/' + taskData.id + '/page/' + taskData.nextAvailablePageId;
        };

        $scope.goToStatistics = function goToStatistics(taskData) {
            alert('Statistik er endnu ikke klar');
        };

        taskService.getTasks().then(function(response) {
            $scope.openProjects = response;
        }).finally(function() {
            $scope.loading = false;
        });


    };

    return mypageController;

});