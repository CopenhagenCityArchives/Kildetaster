define([


], function() {

    var searchController = /*@ngInject*/ function searchController(
        $q,
        $timeout,
        $scope,
        $stateParams,
        $state,
        $rootScope,
        $anchorScroll,
        solrService,
        searchService,
        searchConfig,
        Analytics
    ) {

        var that = this;

        that.initialized = false;

        // Search params
        that.queries = [];
        that.simpleQuery = [];

        // Set which search section opens
        that.sectionAdvanced = false;
        that.sectionSimple = true;

        // The index of the current page
        that.page = 0;
        // How many posts to show on a page
        that.postsPrPage = 10;

        // Set sortDirection
        that.sortDirection = searchService.sortDirection;

        //Default field to sort by, use value from rootScope if we have it, otherwise default ot lastname
        that.sortField = $rootScope.sortField ? $rootScope.sortField : searchConfig.fields['lastname'];

        that.canSearchAdvanced = false;

        //Check for changes in quries, and update ability to search
        $scope.$watch(
            function(){
                return that.queries;
            },
            function(newValue, oldValue) {
                that.canSearchAdvanced = true;
                angular.forEach(that.queries, function(key, index){
                    if(!key.term || (key.term && !key.term.label && key.term.trim() == '')){
                        that.canSearchAdvanced = false;
                        return;
                    }
                });
        },true);

        that.canSearchSimple = false;

        $scope.$watch(
            function(){
                if(that.simpleQuery && that.simpleQuery[0]){
                    return that.simpleQuery[0];
                }
            },
            function(newValue, oldValue){
                if(newValue && newValue.term && newValue.term.trim() !== ""){
                    that.canSearchSimple = true;
                }
                else{
                    that.canSearchSimple = false;
                }
        },true);

        // Toggle for opening and closing simple-search and advanced-search sections
        $scope.toggle = function(section) {
            if(section == 'sectionSimple') {
                if(that.sectionSimple == true) {
                    that.sectionSimple = false;
                } else {
                    that.sectionAdvanced = false;
                    that.sectionSimple = true;
                }
            }
            if(section == 'sectionAdvanced') {
                if(that.sectionAdvanced == true) {
                    that.sectionAdvanced = false;
                } else {
                    that.sectionAdvanced = true;
                    that.sectionSimple = false;
                }
            }
            Analytics.trackEvent('person_search', 'toggle_search_type', section);
        };


        //Private method used to init/reset search fields
        var initSearchFields = function(){
            // Add default search config field for firstnames
            that.addField('freetext_store', '', 'in_multivalued');

            //Add default freetext_store field in simple query
            that.simpleQuery = [];
            that.addSimple('freetext_store', '', 'in_multivalued');

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
        };

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
            }

            row.operator = searchConfig.operators[searchConfig.types[row.field.type].operators[0]];

            // if the term is an object, or the field type is not a string, or the field is a UTC time format then reset term value
            if (typeof row.term !== "string" || row.field.type !== "string" || row.term.match(/\d{4}-[0-1]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-6]\d.\d{3}Z/)) {
                row.term = undefined;
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
            console.log("Add field");
            // verify and set default field
            if (!searchConfig.fields.hasOwnProperty(defaultFieldName)) {
                console.log("fail 1");
                return;
            }

            var field = searchConfig.fields[defaultFieldName];

            // verify
            if (!searchConfig.types.hasOwnProperty(field.type) ||
                (op && !searchConfig.types[field.type].operators.includes(op))) {
                    console.log("fail 2");
                return;
            }

            var operator;
            if (op) {
                operator = searchConfig.operators[op];
            } else {
                operator = searchConfig.operators[searchConfig.types[field.type].operators[0]];
            }

            that.queries.push({ field: field, operator: operator, term: term });
            
            if(that.queries.length > 1){
                Analytics.trackEvent('person_search', 'add_field', 'add_field.' + defaultFieldName);
            }

        };

        that.addSimple = function addSimple(defaultFieldName, term, op) {
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

            that.simpleQuery.push({ field: field, operator: operator, term: term });
        }

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

            Analytics.trackEvent('person_search', 'remove_field');
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

            if (that.sectionAdvanced === false) {
                $scope.doSimpleSearch();
            } else {
                $scope.doAdvancedSearch();
            }
        }

        that.sortFieldValid = function() {
            var sortFieldValid = that.sortField.collections.some(function(collection) {
                return that.collections[collection].selected;
            });
            if (!sortFieldValid) {
                var keys = Object.keys(searchConfig.fields);
                for (i = 0; i < keys.length; i++) {
                    var valid = searchConfig.fields[keys[i]].sortable && searchConfig.fields[keys[i]].collections.some(function(collection) {
                        return that.collections[collection].selected;
                    });
                    if (valid) {
                        that.sortField = searchConfig.fields[keys[i]];
                        $rootScope.sortField = that.sortField;
                        break;
                    }
                }
            }
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

            that.sortFieldValid();

            var analyticsCollections = [];
            angular.forEach(that.collections, function(value, key){if(value.selected) { analyticsCollections.push(value.id);}});
            Analytics.trackEvent('person_search', 'change_collection', 'change_collections.' + analyticsCollections.join(','));
        };

        $scope.resetSearch = function(){
            solrService.clearSearchData();
            searchService.currentSearch = null;
            that.queries = [];
            $scope.simpleQuery = [];
            that.filterQueries = [];

            initSearchFields();

            Analytics.trackEvent('person_search', 'reset_search');
        };

        /**
        * Execute the Simple Search
        // TODO update to use that
        */
        $scope.doSimpleSearch = function doSimpleSearch() {
            console.log("Now that is a simple search");
            solrService.clearSearchData();

            Analytics.trackEvent('person_search', 'start_search_simple');

            var colIds = [];
            // Set all collections for simple search
            angular.forEach(that.collections, function(collection, id) {
                    colIds.push(collection.id);
            });
            // Prepare search configuration
            var thisSearch = {
                queries: that.simpleQuery,
                filterQueries: that.filterQueries,
                collections: colIds,
                sortField: that.sortField,
                sortDirection: that.sortDirection,
                postsPrPage: that.postsPrPage,
                page: that.page,
                isAdvanced: false
            };

            console.log("This is a config:");
            console.log(thisSearch);

            searchService.currentSearch = thisSearch;
            // Set the configuration in the service
            searchService.setSearch(thisSearch);
            console.log("wow");
            console.log($state);
            // Go to the results state to search and show results
            $state.go('.results');

        };

        /**
        * Execute the Advanced Search
        // TODO update to use that
        */
        $scope.doAdvancedSearch = function doAdvancedSearch() {

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
                page: that.page,
                isAdvanced: true
            };

            // Set the configuration in the service
            searchService.currentSearch = thisSearch;

            searchService.setSearch(thisSearch);

            Analytics.trackEvent('person_search', 'start_search_advanced', 'start_advanced_search_collections.'+colIds.join());

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

                initSearchFields();
            }
            // entry from URL
            else if (!searchService.currentSearch && searchService.urlParamsExist()) {
                var urlSearch = searchService.getSearch(searchConfig);

                that.queries = [];
                that.simpleQuery = [];

                // Set collections and check those from prev search
                that.collections = angular.copy(searchConfig.collections);
                angular.forEach(urlSearch.collections, function(id) {
                    if (that.collections[id]) {
                        that.collections[id].selected = true;
                    }
                });

                // Check to see which section is relevant
                if (urlSearch.isAdvanced) {
                    // Open advanced search, and set default on simple
                    that.addSimple('freetext_store', '', 'in_multivalued');
                    that.sectionAdvanced = true;
                    that.sectionSimple = false;

                    // Push advanced fields
                    angular.forEach(urlSearch.queries, function(item) {
                        that.queries.push(item);
                    });
        
                    //Push the fields added into advanced query fields as standard
                    that.queries.push(that.simpleQuery[0]);

                } else if(urlSearch.queries.length === 1 && urlSearch.queries[0].field.name === "freetext_store" && Object.keys(that.collections).length === urlSearch.collections.length) {

                    // Open simple search, and set default on advanced
                    that.addField('firstnames', '', 'eq');
                    that.sectionAdvanced = false;
                    that.sectionSimple = true;

                    // Push simple field
                    that.simpleQuery.push(urlSearch.queries[0]);

                } else {
                    // Open advanced search, and set default on simple
                    that.addSimple('freetext_store', '', 'in_multivalued');
                    that.sectionAdvanced = true;
                    that.sectionSimple = false;

                    // Push advanced fields
                    angular.forEach(urlSearch.queries, function(item) {
                        that.queries.push(item);
                    });

                }


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
                }
                that.sortFieldValid();
                that.postsPrPage = urlSearch.postsPrPage;
                that.page = urlSearch.page;

                $anchorScroll('search-start');

            }
            // Entry into page that is already configured
            else {
                if (!searchService.currentSearch.sortField.collections.some(function(colId) {
                    return searchService.currentSearch.collections.indexOf(colId) != -1;
                })) {
                    searchService.currentSearch.sortField = searchConfig.fields['lastname'];
                }

                // Add current search config to the url query param
                searchService.setSearch(searchService.currentSearch);

                // Set collections and check those from prev search
                that.collections = angular.copy(searchConfig.collections);
                angular.forEach(searchService.currentSearch.collections, function(id) {
                    if (that.collections[id]) {
                        that.collections[id].selected = true;
                    }
                });


                // Check to see which section is relevant
                if (searchService.currentSearch.isAdvanced) {
                    // Open advanced search, and set default on simple
                    that.addSimple('freetext_store', '', 'in_multivalued');
                    that.sectionAdvanced = true;
                    that.sectionSimple = false;

                    // Set advanced fields
                    searchService.currentSearch.queries.forEach(function(item, index) {
                        that.addField(item.field.name, item.term, item.operator.op);
                    });

                } else if(searchService.currentSearch.queries.length === 1 && searchService.currentSearch.queries[0].field.name === "freetext_store" && Object.keys(that.collections).length === searchService.currentSearch.collections.length) {

                    // Open simple search, and set default on advanced
                    if ($scope.fieldCollectionFilter(searchConfig.fields['firstnames'])) {
                        that.addField('firstnames', '', 'eq');
                    } else {
                        that.addField('freetext_store', searchService.currentSearch.queries[0].term, searchService.currentSearch.queries[0].operator.op)
                    }
                    that.sectionAdvanced = false;
                    that.sectionSimple = true;

                    // Set simple field
                    that.addSimple('freetext_store', searchService.currentSearch.queries[0].term, 'in_multivalued');

                } else {
                    // Open advanced search, and set default on simple
                    that.addSimple('freetext_store', '', 'in_multivalued');
                    that.sectionAdvanced = true;
                    that.sectionSimple = false;

                    // Set advanced fields
                    searchService.currentSearch.queries.forEach(function(item, index) {
                        that.addField(item.field.name, item.term, item.operator.op)
                    });

                }


                that.filterQueries = [];
                searchService.currentSearch.filterQueries.forEach(function(filterQuery) {
                    that.filterQueries.push(filterQuery);
                });

                that.page = searchService.currentSearch.page;
                that.postsPrPage = searchService.currentSearch.postsPrPage;

                $anchorScroll('search-start');


            }

            $timeout(function() {
                that.initialized = true;
            });
        };

        that.init();

    };

    return searchController;

});
