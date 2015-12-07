define([

], function() {

    var editorController = function editorController($scope, $state, taskData) {

        $scope.protocol = taskData.name;

        $scope.progress = Math.round(taskData.pagesLeft / taskData.pagesTotal * 100);

        $scope.pagesTotal = taskData.pagesTotal;
        
        $scope.currentPage = 34;

        $scope.goToNextAvailablePage = function goToNextAvailablePage() {
            $state.go('.', { pageId: taskData.nextAvailablePageId})
        };

    };

    return editorController;

});