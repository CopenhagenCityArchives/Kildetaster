define([


], function() {

    var searchController = /*@ngInject*/ function opentasksController($scope, $rootScope, searchService) {

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


        function buildSolrValue(configRow) {
            var operator;

            switch (configRow.operator) {
                case 'startsWith':
                    operator = configRow.term + '*';
                    break;
                case 'endsWith':
                    operator = '*' + configRow.term;
                    break;
                case 'contains':
                    operator = '*' + configRow.term + '*';
            }

            return operator;
        }

        /**
        *
        * @return {array} A list of the fields that are facetable
        */
        function buildFacetsForQuery(config) {
            var arr = [];
            config.forEach(function(field) {
                if (field.facetable === '1') {
                    arr.push(field.solr_name);
                }
            });
            return arr;
        }

        /**
        * Build the string that matches the current query
        */
        function buildSolrQuery(arr) {
            var rtn = [];

            arr.forEach(function(row) {
                if (row.field !== undefined) {
                    rtn.push(encodeURIComponent(row.field.solr_name + ':' + buildSolrValue(row)));
                }
            });

            return rtn.join(' AND ');
        }

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

        /**
        * Execute the search
        */
        $scope.doSearch = function doSearch() {
            
            $scope.searching = true;
          
            searchService.search(buildSolrQuery($scope.config), buildFacetsForQuery($scope.fields)).then(function(response) {
                $scope.results = response.response;
                $scope.facets = response.facet_counts.facet_fields;
                
                //$scope.facetData = buildFacetData($scope.facets);

                $rootScope.$broadcast('facetsUpdated', buildFacetData($scope.facets) );

            }).catch(function(err) {
                console.log('Error in search:', err);
                //Error handling
            }).finally(function() {
                $scope.searching = false;
            });
            
        };

        $scope.init = function init() {

            $scope.loading = true;

            $scope.config.push({});

            searchService.getFields().then(function(response) {
                $scope.fields = response[0].fields;
            });

            //$scope.doSearch();
            
        };

        $scope.init();

    };

    return searchController;

});