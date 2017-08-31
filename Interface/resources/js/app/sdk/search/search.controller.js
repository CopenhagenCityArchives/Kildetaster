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
        searchConfig
    ) {

        var that = this;

        that.loading = false;
        that.initialized = false;

        that.config = [];

        that.results = [];

        that.currentIndex = 0;
        that.currentPage = 0;

        that.facetableFields = searchConfig[0].fields.map(function(field) {
            //Return only the facets part of the object
            if (field.facets) {
                return field.facets;
            }

        })
        //filter out empty entries in the array
        .filter(Boolean);

        //Use stored direction if we have one, otherwise default to asc
        that.sortDirection = $rootScope.sortDirection ? $rootScope.sortDirection : 'asc';

        //Default field to sort by, use value from rootScope if we have it, otherwise default ot lastname
        that.sortByField = $rootScope.sortByField ? { name: $rootScope.sortByField } : {name: "lastname" };

        /**
        * Prepare row for input, clearing any already set term and reset operator to its
        * default value
        */
        that.clearRow = function clearRow(row) {
            if (that.initialized) {
                row.operator = row.field.operators[0].solr_query;
                row.term = '';
            }
        };

        $scope.shouldEscape = function(row, operator) {

            var found = row.field.operators.find(function(operatorItem) {
                return operatorItem.solr_query === operator;
            });


            if (found) {

                row.escapeSpecialChars = found.escape_special_chars || false;

                if (!row.escapeSpecialChars) {
                    row.term = row.term.replace('*', ' ');
                }
                else {
                    row.term = row.term.replace(' ', '*');
                }

            }

        }

        /**
        * Add new row of config
        *
        * @param defaultFieldName {string} The name of the field type to set as default selection
        * @param term {string} The value of the term field
        * @param operator {string} The operator value for the operator to select
        * @param shouldEscape {bool} Should we run conversion logic, to handle spaces?
        */
        that.addField = function addField(defaultFieldName, term, operator, shouldEscape) {

            var defaultField,
                found,
                fieldConfig = {};

            if (defaultFieldName) {
                found = that.fields.filter(function(field) {
                    return field.solr_name === defaultFieldName;
                });

                if (found) {
                    fieldConfig.field = found[0];
                }
            }

            if (term) {
                fieldConfig.term = term;
            }

            if (shouldEscape !== undefined) {
                fieldConfig.escapeSpecialChars = shouldEscape;
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
            that.config.push(fieldConfig);
        };

        /**
        * Remove a given row, based on its index in the array
        */
        that.removeField = function removeField(fieldIndex, event) {
            event.preventDefault();
            that.config.splice(fieldIndex, 1);
        };


        /**
        * Toggle between sorting desc and asc
        */
        $scope.toggleSortDirection = function toggleSortDirection() {

            var params = {};

            if ($scope.sortDirection === 'desc') {
                $scope.sortDirection = 'asc';
            } else {
                $scope.sortDirection = 'desc';
            }

            //Store selected direction in rootscope, so we have a value if we revisit the list
            $rootScope.sortDirection = $scope.sortDirection;

            params = {
                sort: $scope.sortByField.name + ' ' + $scope.sortDirection,
                start: $scope.currentPage
            };

            //Trigger new search
            $scope.doSearch(undefined, undefined, params);
        }

        that.selectedFilters = {};
        that.noSelectedFilters = true;


        that.toggleFilter = function toggleFilter(fieldName, facetData) {

            if (!that.selectedFilters[fieldName]) {

                var found = that.facetableFields.find(function(field) {
                    return field.facet_key === fieldName;
                });

                that.selectedFilters[fieldName] = {
                    name: facetData.name,
                    fieldName: fieldName,
                    filterQuery: facetData.query
                }
            }
            else {
                delete that.selectedFilters[fieldName];
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

            $rootScope.currentIndex = 0;
            $rootScope.currentPage = 0;

            $scope.currentIndex = 0;
            $scope.currentPage = 0;

            $scope.doSearch();
        }

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

        //TODO move to helpers
        function buildFacetData(field, facetData) {
            var index = 0,
                rtn = [];

            for(var index = 0; field && field.length > index; index = index + 2) {

                rtn.push({
                    name: field[index],
                    count: field[index + 1],
                    query: facetData.facet_query.replace('%f%', facetData.facet_key).replace('%q%', field[index])
                });
            }

            return rtn;

        }


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

            that.pagination = {
                total: Math.ceil(results.numFound / 10),
                pages: arr
            };

        }

        //@see https://stackoverflow.com/questions/24078535/angularjs-controller-as-syntax-and-watch
        $scope.$watch(angular.bind(that, function () {
            return that.results;
        }), function (newval, oldval) {
            if (newval) {
                buildPagination(newval, that.currentIndex);
            }

        });

        $scope.$watch(angular.bind(that, function () {
            return that.currentIndex;
        }), function (newval, oldval) {
            buildPagination(that.results, newval);
        });
        $scope.$watch(angular.bind(that, function () {
            return that.sortByField.name;
        }), function (newval, oldval) {
            //Store value in rootscope, to make it available if we go back to the overview page
            $rootScope.sortByField = newval;
            if (that.results.docs && that.results.docs.length > 0 && newval) {
                $scope.doSearch(undefined, undefined, {sort: newval});
            }
        });
        $scope.$watchCollection(angular.bind(that, function () {
            return that.selectedFilters;
        }), function (newval, oldval) {
            //Test if the selectedFilters object is empty, and set a property to indicate that fact
            if (angular.equals({}, that.selectedFilters)) {
                that.noSelectedFilters = true;
            }
            else {
                that.noSelectedFilters = false;
            }
        });

        /**
        * Execute the search
        */
        $scope.doSearch = function doSearch(query, facets, params) {

            if (that.error) {
                that.error = false;
                that.selectedFilters = {};
            }
            that.searching = true;

            // If we dont have any parameters, and no set sort field, reset sort field to the default
            if (!params && !that.sortByField) {
                that.sortByField = { name: 'lastname' };
            }

            query = query || that.config;
            facets = facets || that.selectedFilters;
            params = params || {};

            if (that.sortByField.name) {
                params.sort = that.sortByField.name + ' ' + that.sortDirection;
            }

            searchService.search(query, facets, params).then(function(response) {

                that.scrambleConfig();
                that.results = response.response;

                that.facets = [];

                //Prepare facet data
                angular.forEach(response.facet_counts.facet_fields, function(field, name) {

                    if (response.facet_counts.facet_fields.hasOwnProperty(name)) {

                        var found = searchConfig[0].fields.find(function(fieldData) {
                            return fieldData.solr_name === name;
                        })

                        //See if we have special mappings for the facet
                        if (found.facets.mappings) {

                            var fieldData = [];

                            //Loop over all mappings on the field
                            found.facets.mappings.forEach(function(mapping) {

                                //Locate those that have a facet_queiry defined
                                if (response.facet_counts.facet_queries[mapping.key] !== undefined) {
                                    //Generate fieldData for the facet, using the name from the search config and count from facet_queries in the search result
                                    fieldData.push({
                                        name: mapping.label,
                                        //Look up the count under facet_queries in the result
                                        count: response.facet_counts.facet_queries[mapping.key],
                                        query: mapping.facet_query
                                    });
                                }

                            });

                            //Add the configured facet
                            that.facets.push({
                                name: name,
                                query: '',
                                label: found.facets.facet_label,
                                field: fieldData
                            });
                        }
                        //Nothing needs to be mapped, use the values as is
                        else {
                            //look up missing values from the array of facetable fields
                            var lookupData = that.facetableFields.find(function(item) {
                                return name === item.facet_key;
                            });

                            that.facets.push({
                                name: lookupData.facet_key,
                                label: lookupData.facet_label,
                                field: buildFacetData(field, lookupData)
                            });

                        }

                    }
                });

            }).catch(function(err) {
                console.log('Error in search:', err);
                that.error = true;
                //Error handling
            }).finally(function() {
                that.searching = false;
            });

        };

        if (searchService.currentSearchConfig !== null) {
            that.config = searchService.currentSearchConfig.query;
            $scope.doSearch(searchService.currentSearchConfig.query, searchService.currentSearchConfig.facets, {sort: that.sortByField.name + ' ' + that.sortDirection});
        }

        that.goToPage = function goToPage(index) {
            that.currentIndex = index;
            that.currentPage = index * 10;
            searchService.currentSearchConfig.params.start = index * 10;

            $scope.doSearch(searchService.currentSearchConfig.query, searchService.currentSearchConfig.facets, searchService.currentSearchConfig.params);
        }

        /**
        * Encodes the current search config, and adds it as a url parameter
        */
        that.scrambleConfig = function scrambleConfig() {

            var cleanedConfig = [];

            that.config.each(function(item, index) {

                var obj = {};
                obj.solr_name = item.field.solr_name;
                obj.term = encodeURIComponent(item.term);
                obj.operator = encodeURIComponent(item.operator);
                obj.escapeSpecialChars = item.escapeSpecialChars;

                cleanedConfig.push(obj);

            })

            var stringed = {};

            stringed.config = cleanedConfig;
            //Store sort direction
            stringed.sortDirection = that.sortDirection;
            //Store sort key
            stringed.sortKey = that.sortByField;

            stringed.selectedFilters = that.selectedFilters;

            stringed.currentIndex = $scope.currentIndex;
            stringed.currentPage = $scope.currentPage;

            stringed = JSON.stringify(stringed);


            $state.go($state.current, {search: stringed}, {notify:false, reload:false});

        }

        that.init = function init() {

            that.fields = searchConfig[0].fields;

            if (that.config.length === 0 && $stateParams.search) {

                var savedConfig = JSON.parse($stateParams.search);

                var params = {};

                savedConfig.config.each(function(item, index) {
                    that.addField(item.solr_name, decodeURIComponent(item.term), decodeURIComponent(item.operator));
                });

                //Get saved sort direction and sort key
                that.sortDirection = savedConfig.sortDirection;
                that.sortByField = savedConfig.sortKey;
                that.selectedFilters = savedConfig.selectedFilters;

                //Trigger new search
                $scope.doSearch(undefined, that.selectedFilters, {sort: that.sortByField.name + ' ' + that.sortDirection});
            }

            //Add empty row if no config exist
            else if (that.config.length === 0) {
                that.addField('firstnames');
            }
            else {

                //Use the stored selection of tilers
                that.selectedFilters = searchService.currentSearchConfig.facets;

                //because the contents of the field dropdown have been updated, the field reference in the existing config object
                //does not point to the same objects, so we need to readd.

                //Store current config in a tmp property as a copy
                var tmp = angular.copy(that.config);
                //clear current config
                that.config = [];

                //add fields from the tmp copy
                tmp.each(function(item, index) {
                    that.addField(item.field.solr_name, item.term, item.operator)
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
