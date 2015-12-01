define([

], function() {

    var editorController = function editorController($scope) {

        $scope.protocol = "Begravelsesprotokol nr. 132, 1850-1851";

        $scope.progress = 40;

        $scope.totalPages = 100;
        $scope.currentPage = 34;
    };

    return editorController;

})