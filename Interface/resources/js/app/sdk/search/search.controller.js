define([


], function() {

    var searchController = /*@ngInject*/ function opentasksController($scope, $rootScope, searchService, availableFields) {

        $scope.loading = false;

        $scope.config = [];

        $scope.results = [];

        $scope.operatorOptions = [
            {
                value: 'contains',
                label: "Indeholder"
            }, {
                value: 'startsWith',
                label: 'Starter med'
            }, {
                value: 'endsWith',
                label: 'Slutter med'
            }];


        /**
        * Add new row of config 
        */
        $scope.addField = function addField() {
            $scope.config.push({});
        };

        /**
        * Remove a given row, based on its index in the array
        */
        $scope.removeField = function removeField(fieldIndex, event) {
            event.preventDefault();
            $scope.config.splice(fieldIndex, 1);
        };

        /**
        * Build data object for facets, based on the facet array given from the backend
        */
        function buildFacetData(facetDataObject) {

            var facetData = [];

            for (var facetArray in facetDataObject) {
                if (facetDataObject.hasOwnProperty(facetArray)) {

                    facetDataObject[facetArray].forEach(function(facet, index, arr) {
                        if (typeof facet === 'string'){
                            facetData.push({
                                field: facetArray,
                                name: getNiceName(facetArray),
                                data: facet,
                                count: arr[index +1]
                            });
                        }
                    });

                }
            }

            return facetData;

        }

        /**
        * Get the nice name based on a solr_name property 
        */
        function getNiceName(solrName) {

            var found = $scope.fields.find(function(field) {
                return field.solr_name === solrName;
            });

            return found.name;
        }


        //TODO move this to a directive
        $scope.submitSearch = function submitSearch($event) {
           
            //Enter key
            if ($event.charCode === 13) {
               $scope.doSearch();
            }
            
        };

        /**
        * Facet clicked, do a filtered search
        */
        $scope.$on('filterSearch', function(event, params) {

            
            searchService.filterQuery($scope.config, params).then(function(response) {
                $scope.results = response.response;

                if (response.facet_counts) {
                    $scope.facets = response.facet_counts.facet_fields;
                }
                
            })
            .catch(function(err) {
                console.log('Error filtering: ', err);

            });
        });

        /**
        * Watch for changes in facets, and broadcast any changes
        */ 
        $scope.$watch('facets', function(newVal, oldVal) {
            $rootScope.$broadcast('facetsUpdated', buildFacetData(newVal) );
        });

        /**
        * Execute the search
        */
        $scope.doSearch = function doSearch(query, facets) {
            
            $scope.searching = true;

            query = query || $scope.config;
            facets = facets || $scope.fields;
          
            searchService.search(query, facets).then(function(response) {
                $scope.results = response.response;
                $scope.facets = response.facet_counts.facet_fields;

            }).catch(function(err) {
                console.log('Error in search:', err);
                //Error handling
            }).finally(function() {
                $scope.searching = false;
            });
            
        };

        if (searchService.currentSearchConfig !== null) {
            $scope.config = searchService.currentSearchConfig.query;
            $scope.doSearch(searchService.currentSearchConfig.query, searchService.currentSearchConfig.facets);
        }

        $scope.init = function init() {

            //Add empty row if no config exist
            if ($scope.config.length === 0) {
                $scope.config.push({});
            }

            $scope.fields = availableFields;
            
        };

        $scope.init();

    };

    return searchController;

});