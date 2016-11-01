define([


], function() {

    var searchController = /*@ngInject*/ function opentasksController($scope, $rootScope, searchService, availableFields) {

        $scope.loading = false;

        $scope.config = [];

        $scope.results = [];

        $scope.currentIndex = 0;

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
        * @params defaultFieldName {string} The name of the field type to set as default selection
        */
        $scope.addField = function addField(defaultFieldName) {

            var defaultField,
                found,
                fieldConfig = {};

            if (defaultFieldName) {
                found = $scope.fields.filter(function(field) {
                    return field.solr_name === defaultFieldName;
                });

                if (found) {
                    fieldConfig.field = found[0];
                }
            }

            $scope.config.push(fieldConfig);
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

        function buildPaginationItem(index) {
            return  {
                label: index + 1,
                index: index
            }
        }

        function buildPagination(results, currentIndex) {

            var arr = [],
                lastPage = Math.ceil(results.numFound / 10);

            if (currentIndex < 1) {
                for (var i=0; i <= 2; i++) {
                    arr.push(buildPaginationItem(i));
                }
            }
            else if(currentIndex > lastPage - 3) {
                arr.push(buildPaginationItem(lastPage - 3));
                arr.push(buildPaginationItem(lastPage - 2));
                arr.push(buildPaginationItem(lastPage - 1));
            }
            else {
                arr.push(buildPaginationItem(currentIndex - 1))
                arr.push(buildPaginationItem(currentIndex))
                arr.push(buildPaginationItem(currentIndex + 1))
            }

            $scope.pagination = {
                total: Math.ceil(results.numFound / 10),
                pages: arr
            };

        }

        $scope.$watch('results', function(newval, oldval) {
            buildPagination(newval, $scope.currentIndex);
        });

        $scope.$watch('currentIndex', function(newval, oldval) {
            buildPagination($scope.results, newval);
        });

        /**
        * Execute the search
        */
        $scope.doSearch = function doSearch(query, facets, params) {

            $scope.searching = true;

            query = query || $scope.config;
            facets = facets || $scope.fields;
            params = params || {};

            searchService.search(query, facets, params).then(function(response) {

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

        $scope.prev = function prev() {
            if ($scope.currentIndex > 0)  {
                $scope.goToPage($scope.currentIndex - 1);
            }

        }

        $scope.next = function next() {
            if ($scope.currentIndex < $scope.pagination.total - 1) {
                $scope.goToPage($scope.currentIndex + 1);
            }
        }

        $scope.goToPage = function goToPage(index) {

            $scope.currentIndex = index;
            $scope.doSearch(searchService.currentSearchConfig.query, searchService.currentSearchConfig.facets, {
                start: index * 10
            });
        }

        $scope.init = function init() {

            $scope.fields = availableFields;

            //Add empty row if no config exist
            if ($scope.config.length === 0) {
                $scope.addField('firstnames');
            }



        };

        $scope.init();

    };

    return searchController;

});
