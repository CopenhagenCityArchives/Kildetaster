define([


], function () {

    var searchResultsController = /*@ngInject*/ function searchResultsController(
        $q,
        $timeout,
        $scope,
        $stateParams,
        $state,
        $anchorScroll,
        $rootScope,
        solrService,
        searchService,
        searchConfig,
        $element,
        Analytics
    ) {

        var that = this;

        $scope.allFacetsExpanded = false;
        $scope.facetsShown = false;



        that.loading = false;
        that.initialized = false;

        that.queries = [];

        that.isAdvanced = false;

        that.filterQueries = [];
        that.noSelectedFilters = true;

        that.results = null;

        // The index of the current page
        that.page = 0;
        that.pageNumber = 1;
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
      
        $scope.goToPost = function (result) {
            $state.go('search.page.result.post', {
                postId: result.id
            });
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

        $scope.$firstTabbable = null;
        $scope.$lastTabbable = null;
        
        function expandFacetFocus(facet) {
            
            var $offcanvas = angular.element($element).find(".facet__offcanvas");

            $offcanvas.off('keydown');
            $offcanvas.on('keydown', function(e) {
                if (e.which === 27) {
                    e.preventDefault ? e.preventDefault() : (e.returnValue = false);
                    $timeout($scope.collapseFacets);
                }
            });

            $scope.$firstTabbable = $offcanvas.find("#filter-" + facet.field + "-label");
            $scope.$lastTabbable = $offcanvas.find('#filter-close');

            // Trap tab focus inside the filter menu. When last tabbable element is focussed the next will be the first tabbable elemenet
            $scope.$lastTabbable.on("keydown", function (e) {
                if (e.which === 9 && !e.shiftKey) {
                    e.preventDefault ? e.preventDefault() : (e.returnValue = false);
                    $scope.$firstTabbable.focus();
                }
            });

            // Trap tab focus inside the filter menu. Same as above but in the other direction.
            $scope.$firstTabbable.on("keydown", function (e) {
                if (e.which === 9 && e.shiftKey) {
                    e.preventDefault();
                    $scope.$lastTabbable.focus();
                }
            });

            $timeout(function() {
                $scope.$firstTabbable.focus()
            });
        }

        $scope.expandFacets = function() {
            for (var i = 0; i < that.facets.length; i++) {
                that.facets[i].enabled = true;
                that.facets[i].expanded = false;
            }
            $scope.allFacetsExpanded = true;
            $scope.facetsShown = true;
            $timeout(function() {expandFacetFocus(that.facets[0])});
        }

        $scope.expandFacet = function(facet) {
            facet.enabled = true;
            facet.expanded = true;
            $scope.facetsShown = true;
            $timeout(function() {expandFacetFocus(facet)});
        }

        $scope.collapseFacets = function() {
            var restoreFocusFacet = null;
            for (var i = 0; i < that.facets.length; i++) {
                // get facet for restoring focus
                if (!restoreFocusFacet && that.facets[i].expanded) {
                    restoreFocusFacet = that.facets[i];
                }

                that.facets[i].expanded = false;
                that.facets[i].enabled = false;
            }
            $scope.allFacetsExpanded = false;
            $scope.facetsShown = false;

            if ($scope.$firstTabbable) {
                $scope.$firstTabbable.off('keydown');
                $scope.$firstTabbable = null;
            }

            if ($scope.$lastTabbable) {
                $scope.$lastTabbable.off('keydown');
                $scope.$lastTabbable = null;
            }

            // restore focus
            if (restoreFocusFacet) {
                $timeout(function() {
                    angular.element($element).find("#facet-button-" + restoreFocusFacet.field).focus();
                })
            }
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
            Analytics.trackEvent('person_search', 'change_facet', 'change_facet.'+facet.field);

            // save bucket and facet for restoring focus
            $scope.restoreBucketFocus = { facet: facet, bucket: bucket };
        }

        $scope.clearFilters = function() {
            // clear filter queries array in-place
            that.filterQueries.splice(0, that.filterQueries.length);

            $scope.doSearch(true);
            // TODO: Add analytics event for this?
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

                    // restore focus if we came from filtering
                    if ($scope.restoreBucketFocus) {
                        $timeout(function() {
                            var selector = '#facet-bucket-' + $scope.restoreBucketFocus.facet.field + '-';
                            if (typeof $scope.restoreBucketFocus.bucket.val == 'string') {
                                selector += $scope.restoreBucketFocus.bucket.val.replace(' ', '-');
                            } else {
                                selector += $scope.restoreBucketFocus.bucket.val;
                            }
                            var restoreBucketElement = angular.element($element).find(selector);
                            restoreBucketElement.focus();
                        })
                    }
                    
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
                page: that.page,
                isAdvanced: that.isAdvanced
            };

            searchService.currentSearch = thisSearch;

            searchService.setSearch(thisSearch);
        };

        that.goToPage = function goToPage(page) {
            that.page = page;

            // Store current page in the search service
            searchService.currentSearch.page = that.page;

            $scope.doSearch(true);

            $anchorScroll('results-start');

            Analytics.trackEvent('person_search', 'go_to_result_page', 'go_to_result_page.'+ that.page);
        }

        that.setPostsPrPage = function setPostsPrPage() {
            // Set page to show the first of the new set (0-based)
            that.page = 0;

            searchService.currentSearch.postsPrPage = that.postsPrPage;
            searchService.currentSearch.page = 0;

            $scope.doSearch(true);

            Analytics.trackEvent('person_search', 'set_posts_per_page', 'set_posts_per_page.' + that.postsPrPage);
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
                that.isAdvanced = urlSearch.isAdvanced;

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
                    searchService.currentSearch.filterQueries.forEach(function (filterQuery) {
                        that.filterQueries.push(filterQuery);
                    });
                }

                that.page = searchService.currentSearch.page;
                that.postsPrPage = searchService.currentSearch.postsPrPage;
                that.isAdvanced = searchService.currentSearch.isAdvanced;

                that.collections = angular.copy(searchConfig.collections);
                angular.forEach(searchService.currentSearch.collections, function (id) {
                    if (that.collections[id]) {
                        that.collections[id].selected = true;
                    }
                });
                $scope.doSearch();

                $anchorScroll('results-start');

            }

            $timeout(function () {
                that.initialized = true;
            });
        };

        $scope.$watch(angular.bind(that, function () {
            return that.sortField;
        }), function (newval, oldval) {
            if(newval.name == oldval.name){
                return;
            }
            //Store value in rootscope, to make it available if we go back to the overview page
            //TODO store in service, not rootscope
            $rootScope.sortField = newval;
            if (that.results && that.results.docs && that.results.docs.length > 0 && newval) {
                $scope.doSearch(true);
            }
            Analytics.trackEvent('person_search', 'change_sorting', 'change_sorting.'+newval.name);
        });
 
        $scope.$watchCollection(angular.bind(that, function () {
            return that.filterQueries;
        }), function (newval, oldval) {
            //Test if the selectedFilters object is empty, and set a property to indicate that fact
            if (angular.equals([], that.filterQueries)) {
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
