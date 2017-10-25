define([


], function() {

    var searchController = /*@ngInject*/ function searchController(
        $q,
        $timeout,
        $scope,
        $stateParams,
        $state,
        $rootScope,
        solrService,
        searchService,
        searchConfig
    ) {

        var that = this;

        that.loading = false;
        that.initialized = false;

        that.queries = [];

        that.filterQueries = [];
        that.noSelectedFilters = true;

        that.results = [];

        $scope.page = 0;
        $scope.postsPerPage = 10;

        //Use stored direction if we have one, otherwise default to asc
        that.sortDirection = $rootScope.sortDirection ? $rootScope.sortDirection : 'asc';

        //Default field to sort by, use value from rootScope if we have it, otherwise default ot lastname
        that.sortField = $rootScope.sortField ? $rootScope.sortField : searchConfig.fields['lastname'];

        /**
        * Prepare row for input, clearing any already set term and reset operator to its
        * default value
        */
        that.clearRow = function clearRow(row) {
            if (that.initialized) {
                if (!row.field) {
                    row.field = Object.values(searchConfig.fields).find(function(field) { 
                        var found = false;
                        angular.forEach(field.collections, function(id) {
                            found = found || $scope.collections[id].selected;
                        });
                        return found;
                    });
                }
                if (row.field) {
                    row.operator = searchConfig.operators[searchConfig.types[row.field.type].operators[0]];
                    row.term = '';
                }
                else {
                    row.operator = undefined;
                    row.term = '';
                }
            }
        };

        /**
        * Add new row of config
        *
        * @param defaultFieldName {string} The name of the field type to set as default selection
        * @param term {string} The value of the term field
        * @param operator {string} The operator value for the operator to select
        * @param shouldEscape {bool} Should we run conversion logic, to handle spaces?
        */
        that.addField = function addField(defaultFieldName, term, op) {
            // verify and set default field
            if (!searchConfig.fields.hasOwnProperty(defaultFieldName)) {
                return;
            }
            var field = searchConfig.fields[defaultFieldName];

            // verify 
            if (!searchConfig.types.hasOwnProperty(field.type) ||
                (op && !searchConfig.types[field.type].operators.includes(op))) {
                return;
            }

            var operator;
            if (op) {
                operator = searchConfig.operators[op];
            } else {
                operator = searchConfig.operators[searchConfig.types[field.type].operators[0]];
            }

            that.queries.push({ field: field, operator: operator, term: term });
        };

        // a field must be associated with all selected collections to be shown
        $scope.fieldCollectionFilter = function(value, index, array) {
            var found = true;

            angular.forEach($scope.collections, function (col, colId) {
                var colInField = value.collections.indexOf(parseInt(colId)) !== -1;
                if (!colInField && col.selected) {
                    found = false;
                }
            });

            return found;
        }

        /**
        * Remove a given row, based on its index in the array
        */
        that.removeField = function removeField(fieldIndex, event) {
            event.preventDefault();
            that.queries.splice(fieldIndex, 1);
        };

        /**
        * Toggle between sorting desc and asc
        */
        that.toggleSortDirection = function toggleSortDirection() {

            var params = {};

            if (that.sortDirection === 'desc') {
                that.sortDirection = 'asc';
            } else {
                that.sortDirection = 'desc';
            }

            //Store selected direction in rootscope, so we have a value if we revisit the list
            $rootScope.sortDirection = that.sortDirection;

            //Trigger new search
            $scope.doSearch();
        }


        $scope.toggleFilter = function toggleFilter(facet, bucket) {
            var idx = that.filterQueries.findIndex(function(filterQuery) {
                return filterQuery.facet.field == facet.field && filterQuery.bucket.val == bucket.val;
            });

            if (idx !== -1) {
                that.filterQueries.splice(idx, 1);
            } else {
                that.filterQueries.push({facet:facet, bucket:bucket});
            }

            $scope.doSearch();
        }

        //TODO move this to a directive
        that.submitSearch = function submitSearch(event) {
            //Enter key
            if (event.charCode === 13) {
               $scope.startNewSearch();
            }

        };

        //Trigger serach and reset indexes
        $scope.startNewSearch = function startNewSearch() {
            $rootScope.page = 0;
            $scope.page = 0;
            $scope.doSearch();
        }

        $scope.collectionsChange = function(collection) {
            // prevent deselection of last collection
            if (collection.selected === false) {
                var anySelected = false;
                angular.forEach($scope.collections, function (collection) {
                    anySelected = anySelected | collection.selected;
                });

                if (!anySelected) {
                    collection.selected = true;
                    return;
                }
            }

            // set up query rows of rows that are undefined due to 
            // the collection, that the field exists in, has been unselected
            angular.forEach(that.queries, function(row) {
                if (!row.field) {
                    that.clearRow(row);
                }
            })

            // update search with collection selection
            if (that.initialized && searchService.currentSearch) {
                $scope.doSearch();
            }
        }

        /**
        * Execute the search
        */
        $scope.doSearch = function doSearch() {
            if (that.error) {
                that.error = false;
                that.filterQueries = [];
            }
            that.searching = true;

            var colIds = [];
            angular.forEach($scope.collections, function(collection, id) {
                if (collection.selected) {
                    colIds.push(collection.id);
                }
            });

            solrService.search(that.queries, that.filterQueries, colIds, that.sortField, that.sortDirection, $scope.page * 10)
            .then(function(response) {
                that.results = response.response;
                
                // process documents
                angular.forEach(that.results.docs, function(doc, index) {
                    // Add highlighting to individual documents
                    angular.forEach(response.highlighting, function(highlights, docId) {
                        if (doc.id === docId) {
                            doc.highlighting = highlights;
                        }
                    });
                });

                that.facetFields = response.facets;

            }).catch(function(err) {
                console.log('Error in search:', err);
                that.error = true;
                //Error handling
            }).finally(function() {
                that.searching = false;
            });

            var thisSearch = { queries: that.queries, filterQueries: that.filterQueries, collections: colIds, sortField: that.sortField, sortDirection: that.sortDirection, page: $scope.page };
            searchService.currentSearch = thisSearch;
            searchService.setSearch(thisSearch);
        };

        that.goToPage = function goToPage(page) {
            $scope.page = page;
            $scope.doSearch();
        }

        that.init = function init() {

            // for selects in template
            $scope.fieldIndex = searchConfig.fields;
            $scope.fields = Object.values(searchConfig.fields);
            $scope.types = searchConfig.types;
            $scope.operators = searchConfig.operators;
            $scope.facets = Object.values(searchConfig.facets);

            // Clean entry
            if (!searchService.currentSearch && !searchService.urlParamsExist()) {
                that.addField('firstnames', '', "eq");
                $scope.collections = angular.copy(searchConfig.collections);
                angular.forEach($scope.collections, function(col, id) {
                    col.selected = true;
                });
            }
            // entry from URL
            else if (!searchService.currentSearch && searchService.urlParamsExist()) {
                var urlSearch = searchService.getSearch(searchConfig);

                that.queries = [];
                angular.forEach(urlSearch.queries, function(item) {
                    that.queries.push(item);
                });

                that.filterQueries = [];
                angular.forEach(urlSearch.filterQueries, function(filterQuery) {
                    that.filterQueries.push(filterQuery);
                });

                //Get saved sort direction and sort key
                that.sortDirection = urlSearch.sortDirection;
                that.sortField = urlSearch.sortField;
                $scope.page = urlSearch.page;

                $scope.collections = angular.copy(searchConfig.collections);
                angular.forEach(urlSearch.collections, function(id) {
                    if ($scope.collections[id]) {
                        $scope.collections[id].selected = true;
                    }
                });

                //Trigger new search
                $scope.doSearch();
            }
            // Entry into page that is already configured
            else {
                searchService.currentSearch.queries.each(function(item, index) {
                    that.addField(item.field.name, item.term, item.operator.op)
                });

                that.filterQueries = [];
                searchService.currentSearch.filterQueries.each(function(filterQuery) {
                    that.filterQueries.push(filterQuery);
                });

                $scope.page = searchService.currentSearch.page;
                $scope.collections = angular.copy(searchConfig.collections);
                angular.forEach(searchService.currentSearch.collections, function(id) {
                    if ($scope.collections[id]) {
                        $scope.collections[id].selected = true;
                    }
                });
                $scope.doSearch();
            }

            $timeout(function() {
                that.initialized = true;
            });
        };

        $scope.$watch(angular.bind(that, function () {
            return that.sortField;
        }), function (newval, oldval) {
            //Store value in rootscope, to make it available if we go back to the overview page
            $rootScope.sortField = newval;
            if (that.results.docs && that.results.docs.length > 0 && newval) {
                $scope.doSearch();
            }
        });

        $scope.$watchCollection(angular.bind(that, function () {
            return that.filterQueries;
        }), function (newval, oldval) {
            //Test if the selectedFilters object is empty, and set a property to indicate that fact
            if (angular.equals({}, that.filterQueries)) {
                that.noSelectedFilters = true;
            }
            else {
                that.noSelectedFilters = false;
            }
        });

        that.init();

    };

    return searchController;

});
