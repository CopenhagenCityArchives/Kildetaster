define([

], function() {

    var mypageController = function mypageController($scope, projectService, $location) {

        $scope.loading = true;
        $scope.openProjects = [];

        $scope.goToEditor = function goToEditor(projectData) {
            alert('Open project with id:' + projectData.id + ' on page with id:' + projectData.nextAvailablePageId);
        };

        $scope.goToStatistics = function goToStatistics(projectData) {
            alert('Open statistics for project with id:' + projectData.id);
        };

        projectService.getProjects().then(function(response) {
            $scope.openProjects = response;
        }).finally(function() {
            $scope.loading = false;
        });


    };

    return mypageController;

});