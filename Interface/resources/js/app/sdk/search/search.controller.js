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

        that.results = {};

        // The index of the current page
        that.page = 0;
        // How many posts to show on a page
        that.postsPrPage = 10;

        // Set sortDirection
        that.sortDirection = searchService.sortDirection;

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
                            found = found || that.collections[id].selected;
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
        * TODO update to use that
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
        // TODO update to use that
        $scope.fieldCollectionFilter = function(value, index, array) {
            var found = true;

            angular.forEach(that.collections, function (col, colId) {
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
            searchService.sortDirection = that.sortDirection;

            //Trigger new search
            $scope.doSearch(true);
        }

        // TODO update to use that
        $scope.toggleFilter = function toggleFilter(facet, bucket) {
            var idx = that.filterQueries.findIndex(function(filterQuery) {
                return filterQuery.facet.field == facet.field && filterQuery.bucket.val == bucket.val;
            });

            if (idx !== -1) {
                that.filterQueries.splice(idx, 1);
            } else {
                that.filterQueries.push({facet:facet, bucket:bucket});
            }

            that.page = 0;
            searchService.currentSearch.page = 0;

            $scope.doSearch(true);
        }

        //TODO move this to a directive
        that.submitSearch = function submitSearch(event) {
            //Enter key
            if (event.charCode === 13) {
               $scope.startNewSearch();
            }

        };

        //Trigger search and reset indexes
        // TODO update to use that
        $scope.startNewSearch = function startNewSearch() {
            $rootScope.page = 0;
            that.page = 0;
            $scope.doSearch(true);
        }

        /**
         * 
         */
        that.collectionsChange = function(collection) {

            // prevent deselection of last collection
            if (collection.selected === false) {
                var anySelected = false;
                angular.forEach(that.collections, function (collection) {
                    anySelected = anySelected || collection.selected;
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
            });

        }

        /**
        * Execute the search
        // TODO update to use that
        */
        $scope.doSearch = function doSearch(forceNew) {

            if (forceNew) {
                solrService.clearSearchData();
            }
            
            if (that.error) {
                that.error = false;
                that.filterQueries = [];
            }
            that.searching = true;

            var colIds = [];
            angular.forEach(that.collections, function(collection, id) {
                if (collection.selected) {
                    colIds.push(collection.id);
                }
            });

            searchService.currentSearch.collections = colIds;

            // Update current search settings
            searchService.currentSearch.queries = that.queries;

            searchService.currentSearch.filterQueries = that.filterQueries;

            solrService.search(
                that.queries, 
                that.filterQueries, 
                colIds, 
                that.sortField, 
                that.sortDirection, 
                that.page * that.postsPrPage,
                that.postsPrPage
            )
            .then(function(response) {
                that.results = response.response;

                //Reset page number and search again if no results are found on current page
                if(that.results && that.results.numFound == 0 && that.page > 1){
                    that.page = 1;
                    $scope.doSearch(true);
                }

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

            var thisSearch = { 
                queries: that.queries, 
                filterQueries: that.filterQueries, 
                collections: colIds, 
                sortField: that.sortField, 
                sortDirection: that.sortDirection, 
                postsPrPage: that.postsPrPage,
                page: that.page
            };
            
            searchService.setSearch(thisSearch);
        };

        that.goToPage = function goToPage(page) {
            that.page = page;
            
            // Store current page in the search service
            searchService.currentSearch.page = page;

            $scope.doSearch(true);
        }

        that.setPostsPrPage = function setPostsPrPage(count) {
            that.postsPrPage = count;
            // Set page to show the first of the new set (0-based)
            that.page = 0;

            searchService.currentSearch.postsPrPage = count;
            searchService.currentSearch.page = 0;

            $scope.doSearch(true);
        }

        that.showSearchConfig = function showSearchConfig() {
            // Reset results
            that.results = {};
            // Reset filters
            that.filterQueries = [];
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
                
                searchService.getSearch(searchConfig);
                
                that.addField('firstnames', '', 'eq');
                that.collections = angular.copy(searchConfig.collections);
                angular.forEach(that.collections, function(col, id) {
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
                that.postsPrPage = urlSearch.postsPrPage;
                that.page = urlSearch.page;

                that.collections = angular.copy(searchConfig.collections);
                angular.forEach(urlSearch.collections, function(id) {
                    if (that.collections[id]) {
                        that.collections[id].selected = true;
                    }
                });

                //Trigger new search
                $scope.doSearch(true);
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

                that.page = searchService.currentSearch.page;
                that.postsPrPage = searchService.currentSearch.postsPrPage;
                that.collections = angular.copy(searchConfig.collections);
                angular.forEach(searchService.currentSearch.collections, function(id) {
                    if (that.collections[id]) {
                        that.collections[id].selected = true;
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
            //TODO store in service, not rootscope
            $rootScope.sortField = newval;
            if (that.results.docs && that.results.docs.length > 0 && newval) {
                $scope.doSearch(true);
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
