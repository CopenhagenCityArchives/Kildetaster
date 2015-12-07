define([

], function() {

    var editorController = function editorController($scope, $state, pageData) {       

        $scope.nextPageId = pageData.nextPageId;
        $scope.prevPageId = pageData.prevPageId;

        $scope.pageNumber = pageData.pageNumber;

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
                url: pageData.imageUrl,
                navigatorPosition: 'TOP_LEFT',
                overlays: pageData.overlays
            }

        };
        
    };

    return editorController;

});