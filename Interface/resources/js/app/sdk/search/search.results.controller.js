define([


], function () {

    var searchResultsController = /*@ngInject*/ function searchResultsController(
        $q,
        $timeout,
        $scope,
        $stateParams,
        $state,
        $rootScope,
        solrService,
        searchService,
        searchConfig,
        Analytics
    ) {

        var that = this;

        that.loading = false;
        that.initialized = false;

        that.queries = [];

        that.filterQueries = [];
        that.noSelectedFilters = true;

        that.results = null;

        // The index of the current page
        that.page = 0;
        // How many posts to show on a page
        that.postsPrPage = 10;

        // Set sortDirection
        that.sortDirection = searchService.sortDirection;

        //Default field to sort by, use value from rootScope if we have it, otherwise default ot lastname
        that.sortField = $rootScope.sortField ? $rootScope.sortField : searchConfig.fields['lastname'];

        // a sort field must be associated with some selected collection to be shown
        that.fieldCollectionFilter = function(field, index, array) {
            var found = false;

            angular.forEach(field.collections, function (colId) {
                if (that.collections[colId] && that.collections[colId].selected) {
                    found = true;
                }
            });

            return found;
        }

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
            var idx = that.filterQueries.findIndex(function (filterQuery) {
                return filterQuery.facet.field == facet.field && filterQuery.bucket.val == bucket.val;
            });

            if (idx !== -1) {
                that.filterQueries.splice(idx, 1);
            } else {
                that.filterQueries.push({ facet: facet, bucket: bucket });
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
        * Execute the search
        // TODO update to use that
        */
        $scope.doSearch = function doSearch(forceNew) {

            Analytics.trackEvent('person_search', 'start_search');

            if (forceNew) {
                solrService.clearSearchData();
            }

            if (that.error) {
                that.error = false;
                that.filterQueries = [];
            }
            that.searching = true;

            var colIds = [];
            angular.forEach(that.collections, function (collection, id) {
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
                .then(function (response) {
                    that.results = response.response;

                    //Reset page number and search again if no results are found on current page
                    if (that.results && that.results.numFound == 0 && that.page > 1) {
                        that.page = 1;
                        $scope.doSearch(true);
                    }

                    if(that.results && that.results.numFound == 0 && that.filterQueries.length > 0) {
                        that.filterQueries = [];
                        $scope.doSearch(true);
                    }

                    // process documents
                    angular.forEach(that.results.docs, function (doc, index) {
                        // Add highlighting to individual documents
                        angular.forEach(response.highlighting, function (highlights, docId) {
                            if (doc.id === docId) {
                                doc.highlighting = highlights;
                            }
                        });
                    });

                    that.facetFields = [];
                    angular.forEach(response.facets, function(value, key) {
                        if(response.facets[key].buckets && response.facets[key].buckets.length > 0){
                            this[key] = response.facets[key];
                        }
                    }, that.facetFields);

                    //console.log(response.facets, that.facetFields);
                }).catch(function (err) {
                    console.log('Error in search:', err);
                    that.error = true;
                    //Error handling
                }).finally(function () {
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

            searchService.currentSearch = thisSearch;
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

        that.init = function init() {

            that.fieldIndex = searchConfig.fields;
            that.fields = Object.values(searchConfig.fields);
            that.facets = Object.values(searchConfig.facets);

            // Clean entry
            if (!searchService.currentSearch && !searchService.urlParamsExist()) {
                $state.go('^');
            }
            // entry from URL
            else if ((!searchService.currentSearch || !searchService.currentSearch.queries) && searchService.urlParamsExist()) {

                var urlSearch = searchService.getSearch(searchConfig);

                that.queries = [];
                angular.forEach(urlSearch.queries, function (item) {
                    that.queries.push(item);
                });

                that.filterQueries = [];
                angular.forEach(urlSearch.filterQueries, function (filterQuery) {
                    that.filterQueries.push(filterQuery);
                });

                //Get saved sort direction and sort key
                that.sortDirection = urlSearch.sortDirection;
                if (urlSearch.sortField.collections.some(function(colId) {
                    return urlSearch.collections.indexOf(colId) != -1;
                })) {
                    that.sortField = urlSearch.sortField;
                } else {
                    that.sortField = searchConfig.fields["lastname"];
                }
                that.postsPrPage = urlSearch.postsPrPage;
                that.page = urlSearch.page;

                that.collections = angular.copy(searchConfig.collections);
                angular.forEach(urlSearch.collections, function (id) {
                    if (that.collections[id]) {
                        that.collections[id].selected = true;
                    }
                });

                //Trigger new search
                $scope.doSearch(true);
            }
            // Entry into page that is already configured
            else {
                if (searchService.currentSearch.sortField && !searchService.currentSearch.sortField.collections.some(function(colId) {
                    return searchService.currentSearch.collections.indexOf(colId) != -1;
                })) {
                    that.sortField = searchConfig.fields["lastname"];
                }

                that.queries = searchService.currentSearch.queries;

                that.filterQueries = [];
                if (searchService.currentSearch.filterQueries) {
                    searchService.currentSearch.filterQueries.each(function (filterQuery) {
                        that.filterQueries.push(filterQuery);
                    });
                }

                that.page = searchService.currentSearch.page;
                that.postsPrPage = searchService.currentSearch.postsPrPage;

                that.collections = angular.copy(searchConfig.collections);
                angular.forEach(searchService.currentSearch.collections, function (id) {
                    if (that.collections[id]) {
                        that.collections[id].selected = true;
                    }
                });
                $scope.doSearch();
            }

            $timeout(function () {
                that.initialized = true;
            });
        };

        $scope.$watch(angular.bind(that, function () {
            return that.sortField;
        }), function (newval, oldval) {
            //Store value in rootscope, to make it available if we go back to the overview page
            //TODO store in service, not rootscope
            $rootScope.sortField = newval;
            if (that.results && that.results.docs && that.results.docs.length > 0 && newval) {
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

    return searchResultsController;

});
