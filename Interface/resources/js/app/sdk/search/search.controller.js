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

        that.selectedFilters = {};

        that.addFilter = function addFilter(fieldName, term) {

            if (!that.selectedFilters[fieldName]) {
                that.selectedFilters[fieldName] = {
                    name: term,
                    filterQuery: fieldName + ':' + term
                }
            }
            else {
                delete that.selectedFilters[fieldName];
            }

            that.doSearch();

        }

        /**
        * Add new row of config
        *
        * @param defaultFieldName {string} The name of the field type to set as default selection
        * @param term {string} The value of the term field
        * @param operator {string} The operator value for the operator to select
        */
        that.addField = function addField(defaultFieldName, term, operator) {

            console.log('adding field', arguments);
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
        that.toggleSortDirection = function toggleSortDirection() {

            if (that.sortDirection === 'desc') {
                that.sortDirection = 'asc';
            } else {
                that.sortDirection = 'desc';
            }

            //Store selected direction in rootscope, so we have a value if we revisit the list
            $rootScope.sortDirection = that.sortDirection;

            //Trigger new search
            that.doSearch(undefined, undefined, {sort: that.sortByField.name + ' ' + that.sortDirection});
        }

        /**
        * Get the nice name based on a solr_name property
        */
        function getNiceName(solrName) {

            var found = that.fields.find(function(field) {
                return field.solr_name === solrName;
            });

            return found.name;
        }


        //TODO move this to a directive
        that.submitSearch = function submitSearch(event) {

            //Enter key
            if (event.charCode === 13) {
               that.doSearch();
            }

        };

        function buildPaginationItem(index) {
            return  {
                label: index + 1,
                index: index
            }
        }

        function buildPagination(results, currentIndex) {

            console.log('ap', results, currentIndex)

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
            buildPagination(newval, that.currentIndex);
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
                that.doSearch(undefined, undefined, {sort: newval});
            }
        });

        /**
        * Execute the search
        */
        that.doSearch = function doSearch(query, facets, params) {

            that.searching = true;

            //If not called directly with a query, its not a previous search, ie. not a new page within the same search setup
            //And we should treat it as a new config and reset the page index, so that we indicate that we show the first page
            //of a new result set
            if (!query) {
                that.currentIndex = 0;
                that.currentPage = 0;
            }

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

            //TODO move to helpers
            function buildFacetData(field) {
                var index = 0,
                    rtn = [];

                for(var index = 0; field.length > index; index = index + 2) {
                    rtn.push({
                        name: field[index],
                        count: field[index + 1]
                    });
                }
                return rtn;

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
                                        count: response.facet_counts.facet_queries[mapping.key]
                                    });
                                }

                            });

                            //Add the configured facet
                            that.facets.push({
                                name: name,
                                label: found.facets.facet_label,
                                field: fieldData
                            });
                        }
                        //Nothing needs to be mapped, use the values as is
                        else {
                            that.facets.push({
                                name: name,
                                label: found.facets.facet_label,
                                field: buildFacetData(field)
                            });
                        }

                        console.log('found', found);


                    }
                });

            }).catch(function(err) {
                console.log('Error in search:', err);
                //Error handling
            }).finally(function() {
                that.searching = false;
            });

        };

        if (searchService.currentSearchConfig !== null) {
            that.config = searchService.currentSearchConfig.query;
            that.doSearch(searchService.currentSearchConfig.query, searchService.currentSearchConfig.facets, {sort: that.sortByField.name + ' ' + that.sortDirection});
        }

        that.goToPage = function goToPage(index) {
            that.currentIndex = index;
            that.currentPage = index * 10;
            searchService.currentSearchConfig.params.start = index * 10;

            that.doSearch(searchService.currentSearchConfig.query, searchService.currentSearchConfig.facets, searchService.currentSearchConfig.params);
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

                cleanedConfig.push(obj);

            })

            var stringed = {};

            stringed.config = cleanedConfig;
            //Store sort direction
            stringed.sortDirection = that.sortDirection;
            //Store sort key
            stringed.sortKey = that.sortByField;

            stringed = JSON.stringify(stringed);

            $state.go($state.current, {search: stringed}, {notify:false, reload:false});

        }

        that.init = function init() {

            that.fields = searchConfig[0].fields;

            if (that.config.length === 0 && $stateParams.search) {

                var savedConfig = JSON.parse($stateParams.search);

                savedConfig.config.each(function(item, index) {
                    that.addField(item.solr_name, decodeURIComponent(item.term), decodeURIComponent(item.operator));
                });

                //Get saved sort direction and sort key
                that.sortDirection = savedConfig.sortDirection;
                that.sortByField = savedConfig.sortKey;

                //Trigger new search
                that.doSearch(undefined, undefined, {sort: that.sortByField.name + ' ' + that.sortDirection});

            }

            //Add empty row if no config exist
            else if (that.config.length === 0) {
                that.addField('firstnames');
            }
            else {

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
