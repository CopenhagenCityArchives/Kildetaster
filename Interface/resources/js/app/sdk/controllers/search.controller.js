define([


], function() {

    var searchController = /*@ngInject*/ function opentasksController($scope, searchService) {

        $scope.loading = false;

        $scope.config = [];

        $scope.results = [];

        /**
        * Add new row of config 
        */
        $scope.addField = function addField() {
            $scope.config.push({});
        };

        /**
        * Remove a given row, based on its index in the array
        */
        $scope.removeField = function removeField(fieldIndex) {
            $scope.config.splice(fieldIndex, 1);
        };


        /**
        * Execute the search
        */
        $scope.doSearch = function doSearch() {
            
            $scope.searching = true;
            
            searchService.search().then(function(response) {
                $scope.results = response;
            }).catch(function(err) {
                //Error handling
            }).finally(function() {
                $scope.searching = false;
            });
            
        };

        $scope.init = function init() {

            $scope.loading = true;

            $scope.config.push({});

            $scope.doSearch();
            
        };

        $scope.init();

    };

    return searchController;

});