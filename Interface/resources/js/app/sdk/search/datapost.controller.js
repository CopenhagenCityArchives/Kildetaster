define([


], function() {

    var datapostController = /*@ngInject*/ function datapostController($stateParams, $scope, $location, searchService, searchConfig, resultData) {
        $scope.highlighting = $stateParams.highlighting;
        var jsonData = JSON.parse(resultData.docs[0].jsonObj);
        $scope.metadata = jsonData.metadata;
        $scope.data = jsonData.data;

        // Set URL location search, if we have a search configuration
        if (!angular.equals(searchService.currentSearch, {})) {
//        	searchService.setSearch(searchService.currentSearch);
//        	$location.search('index', $stateParams.index);
        }
    };

    return datapostController;
});
