define([


], function() {

    var searchController = /*@ngInject*/ function opentasksController(
        $q,
        $timeout,
        $scope,
        $stateParams,
        $state,
        $rootScope,
        searchService,
        availableFields
    ) {

        $scope.loading = false;
        $scope.initialized = false;

        $scope.config = [];

        $scope.results = [];

        $scope.currentIndex = 0;
        $scope.currentPage = 0;

        $scope.sortDirection = 'asc';

        //Default field to sort by
        $scope.sortByField = {name: "lastname" };

        /**
        * Prepare row for input, clearing any already set term and reset operator to its
        * default value
        */
        $scope.clearRow = function clearRow(row) {
            if ($scope.initialized) {
                row.operator = row.field.operators[0].solr_query;
                row.term = '';
            }
        };

        /**
        * Add new row of config
        *
        * @param defaultFieldName {string} The name of the field type to set as default selection
        * @param term {string} The value of the term field
        * @param operator {string} The operator value for the operator to select
        */
        $scope.addField = function addField(defaultFieldName, term, operator) {

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

            if (term) {
                fieldConfig.term = term;
            }

            if (operator) {
                //Lookup the operator in the operators available on the field
                var operatorData = fieldConfig.field.operators.find(function(operatorItem) {
                    return operatorItem.solr_query === operator;
                });

                //If we found the given operator in the fields possible operators, set it
                if (operatorData) {
                    //Set the selected operator
                    fieldConfig.operator = operatorData.solr_query;
                }
                else {
                    console.warn('Trying to set operator: ' + operator + ' but it is not found in the possible operators on the field');
                }
            }
            //Select the first in the list
            else {
                fieldConfig.operator = fieldConfig.field.operators[0].solr_query;
            }
            //add the field configuration
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
        $scope.submitSearch = function submitSearch(event) {

            //Enter key
            if (event.charCode === 13) {
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
                $scope.currentPage = 0;
            }

            // If we dont have any parameters, reset sort field to the default
            if (!params) {
                $scope.sortByField = { name: 'lastname' };
            }

            query = query || $scope.config;
            facets = facets || $scope.fields;
            params = params || {};

            if ($scope.sortByField.name) {
                params.sort = $scope.sortByField.name + ' ' + $scope.sortDirection;
            }

            searchService.search(query, facets, params).then(function(response) {

                $scope.scrambleConfig();
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
            searchService.currentSearchConfig.params.start = index * 10;

            $scope.doSearch(searchService.currentSearchConfig.query, searchService.currentSearchConfig.facets, searchService.currentSearchConfig.params);
        }

        /**
        * Encodes the current search config, and adds it as a url parameter
        */
        $scope.scrambleConfig = function scrambleConfig() {

            var cleanedConfig = [];

            $scope.config.each(function(item, index) {

                var obj = {};
                obj.solr_name = item.field.solr_name;
                obj.term = encodeURIComponent(item.term);
                obj.operator = encodeURIComponent(item.operator);

                cleanedConfig.push(obj);

            })

            var stringed = {};

            stringed.config = cleanedConfig;
            //Store sort direction
            stringed.sortDirection = $scope.sortDirection;
            //Store sort key
            stringed.sortKey = $scope.sortByField;

            stringed = JSON.stringify(stringed);

            $state.go($state.current, {search: stringed}, {notify:false, reload:false});

        }

        $scope.init = function init() {

            $scope.fields = availableFields;

            if ($scope.config.length === 0 && $stateParams.search) {

                var savedConfig = JSON.parse($stateParams.search);

                savedConfig.config.each(function(item, index) {
                    $scope.addField(item.solr_name, decodeURIComponent(item.term), decodeURIComponent(item.operator));
                });

                //Get saved sort direction and sort key
                $scope.sortDirection = savedConfig.sortDirection;
                $scope.sortByField = savedConfig.sortKey;

                //Trigger new search
                $scope.doSearch(undefined, undefined, {sort: $scope.sortByField.name + ' ' + $scope.sortDirection});

            }

            //Add empty row if no config exist
            else if ($scope.config.length === 0) {
                $scope.addField('firstnames');
            }
            else {

                //because the contents of the field dropdown have been updated, the field reference in the existing config object
                //does not point to the same objects, so we need to readd.

                //Store current config in a tmp property as a copy
                var tmp = angular.copy($scope.config);
                //clear current config
                $scope.config = [];

                //add fields from the tmp copy
                tmp.each(function(item, index) {
                    $scope.addField(item.field.solr_name, item.term, item.operator)
                });
            }

            $timeout(function() {
                $scope.initialized = true;
            });


        };

        $scope.init();

    };

    return searchController;

});
