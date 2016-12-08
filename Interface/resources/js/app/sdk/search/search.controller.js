define([


], function() {

    var searchController = /*@ngInject*/ function opentasksController($scope, $rootScope, searchService, availableFields) {

        $scope.loading = false;

        $scope.config = [];

        $scope.results = [];

        $scope.currentIndex = 0;
        $scope.currentPage = 0;

        $scope.sortDirection = 'asc';

        //Default field to sort by
        $scope.sortByField = {name: "firstnames" };

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
        * Toggle between sorting desc and asc
        */
        $scope.toggleSortDirection = function toggleSortDirection() {

            if ($scope.sortDirection === 'desc') {
                $scope.sortDirection = 'asc';
            } else {
                $scope.sortDirection = 'desc';
            }

            //Trigger new search
            $scope.doSearch(undefined, undefined, {sort: $scope.sortByField.name + ' ' + $scope.sortDirection});
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

            //If we are on the first or second page, just show 1-5
            if (currentIndex < 2) {
                for (var i=0; i <= 4; i++) {
                    arr.push(buildPaginationItem(i));
                }
            }
            //We are nearing the end, ie. on one of the last 5 pages
            else if(currentIndex > lastPage - 5) {
                arr.push(buildPaginationItem(lastPage - 5));
                arr.push(buildPaginationItem(lastPage - 4));
                arr.push(buildPaginationItem(lastPage - 3));
                arr.push(buildPaginationItem(lastPage - 2));
                arr.push(buildPaginationItem(lastPage - 1));
            }
            //Otherwise, show current page, and two before and two after
            else {
                arr.push(buildPaginationItem(currentIndex - 2));
                arr.push(buildPaginationItem(currentIndex - 1));
                arr.push(buildPaginationItem(currentIndex));
                arr.push(buildPaginationItem(currentIndex + 1));
                arr.push(buildPaginationItem(currentIndex + 2));
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

        $scope.$watch('sortByField.name', function(newval, oldval) {
            if ($scope.results.docs && $scope.results.docs.length > 0 && newval) {
                $scope.doSearch(undefined, undefined, {sort: newval});
            }
        });


        /**
        * Execute the search
        */
        $scope.doSearch = function doSearch(query, facets, params) {

            $scope.searching = true;

            //If not called directly with a query, its not a previous search, ie. not a new page within the same search setup
            //And we should treat it as a new config and reset the page index, so that we indicate that we show the first page
            //of a new result set
            if (!query) {
                $scope.currentIndex = 0;
            }

            // If we dont have any parameters, reset sort field to the default
            if (!params) {
                $scope.sortByField = { name: 'firstnames' };
            }

            query = query || $scope.config;
            facets = facets || $scope.fields;
            params = params || {};

            if ($scope.sortByField.name) {
                params.sort = $scope.sortByField.name + ' ' + $scope.sortDirection;
            }

            searchService.search(query, facets, params).then(function(response) {

                $scope.results = response.response;
                //$scope.facets = response.facet_counts.facet_fields;

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

        $scope.goToPage = function goToPage(index) {

            $scope.currentIndex = index;
            $scope.currentPage = index * 10;

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
