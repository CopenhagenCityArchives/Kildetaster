define([], function() {
    var searchService = /*@ngInject*/ function searchService($q, $http, $location) {

        return {
            currentSearch: undefined,

            getConfigPromise: function() {
                var deferred = $q.defer();

                $http({
                    url: 'http://localhost:1510/resources/configs/search.json',
                    cache: true
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

            getSearch: function(searchConfig) {
                var queries = {};
                var filterQueries = {};
                var sortDirection = "asc";
                var sortField = searchConfig.fields["lastname"];
                var colIds = [];

                var regex = /(q(\d+)\.(t|op|f)|f(\d)\.(f|l))/

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
                // TODO: verify params (ie. does each query have field/term/operator)

                if ($location.search().sortField && searchConfig.fields[$location.search().sortField]) {
                    sortField = searchConfig.fields[$location.search().sortField];
                }

                var qSortDirection = $location.search().sortDirection;
                if (qSortDirection) {
                    qSortDirection = qSortDirection.toLowerCase();
                }
                if (qSortDirection === "asc" || qSortDirection === "desc") {
                    sortDirection = qSortDirection;
                }

                var page = $location.search().page || 0;
                page = parseInt(page);

                var qCollections = $location.search().collections;
                if (qCollections) {
                    var qColIds = qCollections.split(",");
                    angular.forEach(qColIds, function(colId) {
                        if (searchConfig.collections[colId]) {
                            colIds.push(colId);
                        }
                    });
                } else {
                    angular.forEach(searchConfig.collections, function(collection, id) { colIds.push(id); });
                }

                return { queries: Object.values(queries), filterQueries: Object.values(filterQueries), collections: colIds, sortDirection: sortDirection, sortField: sortField, page: page };
            },

            setSearch: function(search) {
                $location.search({});

                // add queries
                var i = 1;
                angular.forEach(search.queries, function(query) {
                    $location.search("q" + i + ".f", query.field.name);
                    $location.search("q" + i + ".op", query.operator.op);
                    $location.search("q" + i + ".t", encodeURIComponent(query.term));
                    i = i + 1;
                });

                // add facets
                i = 1;
                angular.forEach(search.filterQueries, function(filterQuery) {
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

                if (search.collections && search.collections.length > 0) {
                    $location.search('collections', search.collections.join(","));
                }
            }
        };
    };
    return searchService;
});
