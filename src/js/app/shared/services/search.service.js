define([], function() {
    var searchService = ['$q', '$http', '$location', 'SEARCH_CONFIG_URL', function searchService($q, $http, $location, SEARCH_CONFIG_URL) {

        return {
            currentSearch: undefined,

            // TODO move to currentSearch
            sortDirection: 'asc',

            getConfigPromise: function() {

                var deferred = $q.defer();

                $http({
                    url: SEARCH_CONFIG_URL,
                    // Cache response, to prevent multiple requests to the config
                    cache: true,
                    method: 'GET'
                })
                .then(function(response) {
                    deferred.resolve(response.data);
                })
                .catch(function(err) {
                    deferred.reject(err);
                });

                return deferred.promise;
            },

            urlParamsExist: function() {
                return !angular.equals($location.search(), {});
            },

            getAdvanced: function() {
                var params = $location.search();
                return params.type == "advanced";
            },

            getSearch: function(searchConfig) {

                var queries = {};
                var filterQueries = {};
                var sortField = searchConfig.fields["lastname"];
                var colIds = [];

                // parse query and filterQuery parameters
                var regex = /(q(\d+)\.(f|op|t)|f(\d)\.(f|l))/
                angular.forEach($location.search(), function(value, param) {
                    var match = regex.exec(param);
                    if (match) {
                        if (match[2] !== undefined) { // query parameter
                            if (!queries[match[2]]) {
                                queries[match[2]] = {};
                            }
                            switch (match[3]) {
                                case "f":
                                    queries[match[2]].field = searchConfig.fields[value];
                                    break;
                                case "op":
                                    queries[match[2]].operator = searchConfig.operators[value];
                                    break;
                                case "t":
                                    queries[match[2]].term = decodeURIComponent(value);
                                    break;
                                default: break;
                            }
                        } else { // facet parameter
                            if (!filterQueries[match[4]]) {
                                filterQueries[match[4]] = {};
                            }
                            switch (match[5]) {
                                case "f":
                                    filterQueries[match[4]].facet = searchConfig.facets[value];
                                    break;
                                case "l":
                                    filterQueries[match[4]].bucket = { val: filterQueries[match[4]].facet.type === "range" ? parseInt(value) : value };
                                    break;
                                default: break;
                            }
                        }
                    }
                });

                // verify queries
                var validQueries = [];
                angular.forEach(queries, function(query, idx) {
                    if (query && query.field && query.operator && query.term) {
                        var field = searchConfig.fields[query.field.name];
                        if (field.enum) {
                          query.term = field.enum.find(function(enumval) {
                            return enumval.value.toString() == query.term;
                          });
                        } else if (field.datasource) {
                          query.term = { label: query.term, value: query.term };
                        }
                        validQueries.push(query);
                    }
                });

                // verify filterQueries
                var validFilterQueries = [];
                angular.forEach(filterQueries, function(filterQuery, idx) {
                    if (filterQuery && filterQuery.facet && filterQuery.bucket) {
                        validFilterQueries.push(filterQuery);
                    }
                });

                // Field to sort by
                if ($location.search().sortField && searchConfig.fields[$location.search().sortField]) {
                    sortField = searchConfig.fields[$location.search().sortField];
                }

                // Sort direction
                var qSortDirection = $location.search().sortDirection;
                if (qSortDirection) {
                    qSortDirection = qSortDirection.toLowerCase();
                }
                if (qSortDirection === "asc" || qSortDirection === "desc") {
                    this.sortDirection = qSortDirection;
                }

                // Current page
                this.page = $location.search().page || 0;
                this.page = parseInt(this.page);

                this.postsPrPage = $location.search().postsPrPage || 10;
                this.postsPrPage = parseInt(this.postsPrPage);

                // Selected collections
                var qCollections = $location.search().collections;
                if (qCollections) {
                    var qColIds = qCollections.split(",");
                    angular.forEach(qColIds, function(colId) {
                        if (searchConfig.collections[colId]) {
                            colIds.push(colId);
                        }
                    });
                }
                else {
                    angular.forEach(searchConfig.collections, function(collection, id) { colIds.push(id); });
                }

                // is it an Advanced Search
                if($location.search().type == "advanced") {
                    this.isAdvanced = true;
                } else {
                    this.isAdvanced = false;
                }

                var newConfig = {
                    queries: validQueries,
                    filterQueries: validFilterQueries,
                    collections: colIds,
                    sortDirection: this.sortDirection,
                    sortField: sortField,
                    postsPrPage: this.postsPrPage,
                    page: this.page,
                    isAdvanced: this.isAdvanced
                };

                this.currentSearch = newConfig;

                return newConfig;
            },

            setSearch: function(search) {

                
                $location.search({});

                // add queries
                var i = 1;
                angular.forEach(search.queries, function(query) {
                    // ignore invalid queries
                    if (!query || !query.field || !query.operator) {
                        return;
                    }
                    $location.search("q" + i + ".f", query.field.name);
                    $location.search("q" + i + ".op", query.operator.op);
                    if (query.term.value !== undefined) {
                      $location.search("q" + i + ".t", encodeURIComponent(query.term.value));
                    } else {
                      $location.search("q" + i + ".t", encodeURIComponent(query.term));
                    }
                    i = i + 1;
                });

                // add facets
                i = 1;
                angular.forEach(search.filterQueries, function(filterQuery) {
                    // ignore invalid filterQueries
                    if (!filterQuery || !filterQuery.facet || !filterQuery.bucket) {
                        return;
                    }
                    $location.search("f" + i + ".f", filterQuery.facet.field);
                    $location.search("f" + i + ".l", filterQuery.bucket.val);
                    i = i + 1;
                });

                if (search.sortField) {
                    $location.search('sortField', search.sortField.name);
                }

                if (search.sortDirection) {
                    $location.search('sortDirection', search.sortDirection);
                }

                if (search.page) {
                    $location.search('page', search.page);
                }

                if (search.postsPrPage) {
                    $location.search('postsPrPage', search.postsPrPage);
                }

                if (search.collections && search.collections.length > 0) {
                    $location.search('collections', search.collections.join(","));
                }

                if (search.isAdvanced) {
                    $location.search('type', 'advanced');
                }
            }
        };
    }];

    return searchService;
});
