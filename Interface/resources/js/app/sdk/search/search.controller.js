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

        that.initialized = false;

        that.queries = [];

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
            if (!that.initialized) {
                return
            }

            if (!row.field) {
                row.field = Object.values(searchConfig.fields).find(function(field) {
                    var fieldInAllSelectedCollections = true;
                    angular.forEach(that.collections, function(col) {
                        if (col.selected && field.collections.indexOf(col.id) === -1) {
                            fieldInAllSelectedCollections = false;
                        }
                    });
                    return fieldInAllSelectedCollections;
                });

                // if the term object, and the field type are not both string,
                // reset term value
                if (typeof row.term !== "string" || row.field.type !== "string") {
                    row.term = undefined;
                }
            }
            if (row.field) {
                row.operator = searchConfig.operators[searchConfig.types[row.field.type].operators[0]];
                if(row.field.type !== 'string'){
                    row.term = '';
                }
            }
            else {
                row.operator = undefined;
                row.term = '';
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
            $scope.doSearch();
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
        $scope.doSearch = function doSearch() {

            solrService.clearSearchData();

            var colIds = [];
            // Only set the collections that are currently selected
            angular.forEach(that.collections, function(collection, id) {
                if (collection.selected) {
                    colIds.push(collection.id);
                }
            });

            // Prepare search configuration
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
            // Set the configuration in the service
            searchService.setSearch(thisSearch);

            // Go to the results state to search and show results
            $state.go('.results');

        };

        that.init = function init() {

            // for selects in template
            $scope.fieldIndex = searchConfig.fields;
            $scope.fields = Object.values(searchConfig.fields);
            $scope.types = searchConfig.types;
            $scope.operators = searchConfig.operators;

            // Clean entry
            if (!searchService.currentSearch && !searchService.urlParamsExist()) {

                // Add default search config field for firstnames
                that.addField('firstnames', '', 'eq');
                // Build collections
                that.collections = angular.copy(searchConfig.collections);

                // Initially select all available collections
                angular.forEach(that.collections, function(col, id) {
                    col.selected = true;
                });

                searchService.currentSearch = {
                    page: that.page,
                    postsPrPage: that.postsPrPage
                };

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
                angular.forEach(urlSearch.collections, function(id) {
                    if (that.collections[id]) {
                        that.collections[id].selected = true;
                    }
                });

            }
            // Entry into page that is already configured
            else {
                if (!searchService.currentSearch.sortField.collections.some(function(colId) {
                    return searchService.currentSearch.collections.indexOf(colId) != -1;
                })) {
                    searchService.currentSearch.sortField = searchConfig.fields["lastname"];
                }

                // Add current search config to the url query param
                searchService.setSearch(searchService.currentSearch);

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

            }

            $timeout(function() {
                that.initialized = true;
            });
        };

        that.init();

    };

    return searchController;

});
