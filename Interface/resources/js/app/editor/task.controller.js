define([

], function() {

    var editorController = function editorController($scope, $state, projectData) {

        $scope.protocol = projectData.name;

        $scope.progress = Math.round(projectData.pagesLeft / projectData.pagesTotal * 100);

        $scope.pagesTotal = projectData.pagesTotal;
        
        $scope.currentPage = 34;

        $scope.goToNextAvailablePage = function goToNextAvailablePage() {
            $state.go('.', { pageId: projectData.nextAvailablePageId})
        };

    };

    return editorController;

});