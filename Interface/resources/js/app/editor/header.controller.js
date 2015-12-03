define([

], function() {

    var editorController = function editorController($scope, projectData) {

        $scope.nextPageId = projectData.nextPageId;
        $scope.prevPageId = projectData.prevPageId;

        $scope.protocol = "Begravelsesprotokol nr. 132, 1850-1851";

        $scope.progress = 40;

        $scope.totalPages = 100;
        $scope.currentPage = 34;
    };

    return editorController;

});