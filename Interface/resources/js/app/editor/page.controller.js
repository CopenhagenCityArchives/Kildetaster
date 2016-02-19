define([

], function() {

    var editorController = /*@ngInject*/ function editorController($scope, $state, taskData, pageData, $location, $timeout, $rootScope) {       

        $scope.nextPageId = pageData.nextPageId;
        $scope.prevPageId = pageData.prevPageId;

        $scope.pageNumber = pageData.pageNumber;

        $scope.pageTotal = taskData.pagesTotal;

        $scope.goToPageId = null;
        $scope.goToPage = function goToPage($event) {
            
            //Enter key
            if ($event.charCode === 13) {

                //Redirect to given page number
                //TODO, request to get page details based on page number
                $state.go('.', { pageId: $event.target.value});
            }
            
        };

        $scope.options = {

            tileSources: {
                type: 'image',
                url: pageData.image_url,
                navigatorPosition: 'TOP_LEFT',
                overlays: pageData.overlays
            }

        };

        if (pageData.editArea) {
            $scope.editArea = pageData.editArea;
        }
        
    };

    return editorController;

});