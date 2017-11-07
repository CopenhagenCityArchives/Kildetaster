define([

], function() {

    var solrService = /*@ngInject*/ function solrService($q, $http, API, SOLRAPI, JSONURL, searchService, $filter, $location) {

        var that = this;
        /**
        * Build the string that matches the current query
        */
        function buildSolrQuery(arr) {
            var rtn = [];

            arr.forEach(function(row) {

                if (row.field !== undefined && (row.term || row.term === "")) {
                    rtn.push(encodeURIComponent(buildSolrValue(row)));
                }
            });
            return rtn.join(' AND ');
        }

        /**
        * Prepare solr value by using the api supplied operator, replacing vaues for the field and the search term
        *
        * @param row {object} The row configuration object
        */
        function buildSolrValue(row) {
            var field = row.field.name;
            var type = row.field.type;
            var term = row.term;
            var op = row.operator.op;

            switch (op) {
                case "eq":
                    break;
                case "neq":
                    field = "-" + field;
                    break;
                case "starts":
                    term = term + "*";
                    break;
                case "ends":
                    term = "*" + term;
                    break;
                case "gt":
                    term = "[" + term + " TO *]";
                    break;
                case "lt":
                    term = "[* TO " + term + "]";
                    break;
                case "in":
                    term = "*" + term + "*";
                    break;
                case "nin":
                    field = "-" + field;
                    term = "*" + term + "*";
                    break;
                default:
                    return undefined;
            }

            if (term === "") {
                term = '""';
            }

            term = term.replace(/:/g, '\\:');

            if (type === "string") {
                term = term.replace(/ /g, '\\ ');
            }

            return field +":"+ term;
        }

        function buildSolrBaseQuery(searchConfig) {
            var facetConfig = angular.copy(searchConfig.facets);
            angular.forEach(facetConfig, function(value, key) {
                value.domain = {excludeTags:key.toUpperCase()};
            });
            return "?wt=json&hl=on&hl.fl=erindring_document_text&hl.snippets=3&hl.simple.pre=<b>&hl.simple.post=</b>&json.facet=" + JSON.stringify(facetConfig);        
        }

        function buildSolrFilterQueryValue(facet, bucket) {
            if (facet.type === "range") {
                return '[' + bucket.val + ' TO ' + (bucket.val + facet.gap - 1) + ']'
            } else if (facet.type === "terms") {
                return bucket.val;
            }
        }

        function buildSolrFilterQuery(filterQueries) {
            var rtn = [];

            var filters = {};

            // index by facet field
            angular.forEach(filterQueries, function(filterQuery) {
                if (filters[filterQuery.facet.field]) {
                    filters[filterQuery.facet.field].buckets.push(filterQuery.bucket);
                } else {
                    filters[filterQuery.facet.field] = { facet: filterQuery.facet, buckets: [filterQuery.bucket] };
                }
            });

            angular.forEach(filters, function(filter, field) {
                var facet = filter.facet;
                var buckets = filter.buckets;
                var vals = [];
                angular.forEach(buckets, function(bucket) {
                    vals.push(buildSolrFilterQueryValue(facet, bucket));
                });
                rtn.push('{!tag="' + facet.field.toUpperCase() +'"}' + facet.field + ':(' + vals.join(" ") + ')');
            });

            //join with fq= because if we have multiple entries in the array, they should be seperatred by &, but all be fq
            //but since the buildQueryString function already prepares a fq, the first entry does not need this
            return rtn.join('&fq=');
        }

        /**
        *
        */
        function buildQueryString(queries, filterQueries, collections, sortField, sortDirection, params) {
            
            var rtn = [];

            var options = {
                //The query for the search
                'q': buildSolrQuery(queries),
                //The selected filters to use as facet query
                'fq': buildSolrFilterQuery(filterQueries)
            };

            if (sortField) {
                options.sort = sortField.name + " " + sortDirection
            }

            params = angular.extend(options, params);

            for (var param in params) {
                if (params.hasOwnProperty(param)) {
                    rtn.push(param + '=' + params[param]);
                }
            }

            var collectionsFilter = "";
            if (collections && collections.length > 0)  {
                collectionsFilter = "&fq=collection_id:("+collections.join(" ")+")";
            }

            return rtn.join('&') + collectionsFilter;
        }

        var savedSearch = null;

        return {

            saveSearch: function saveSearch(data) {
                savedSearch = data;
            },

            getSearchData: function getSearchData() {
                return savedSearch;
            },

            /**
             * 
             */
            search: function search(queries, filterQueries, collections, sortField, sortDirection, index, rows) {
                
                var deferred = $q.defer();

                var that = this;

                searchService.getConfigPromise()
                .then(function(searchConfig) {

                    if (savedSearch) {
                        console.log('Getting saved data', savedSearch);
                        deferred.resolve(savedSearch);
                    }
                    else {

                        console.log('Fetching new data');
                    
                        $http({
                            url: SOLRAPI + buildSolrBaseQuery(searchConfig) + '&' + buildQueryString(queries, filterQueries, collections, sortField, sortDirection, { 
                                start: index, 
                                // Number of posts to fetch
                                rows: rows
                            }),
                            method: 'GET'
                        })
                        .then(function(response) {
                            that.saveSearch(response.data);
                            deferred.resolve(response.data);
                        })
                        .catch(function(err) {
                            deferred.reject(err);
                        });
                    }

                })
                .catch(function(err) {
                    deferred.reject(err);
                });

                return deferred.promise;
            },

            /**
             * 
             */
            paginatedSearch: function(queries, filterQueries, collections, sortField, sortDirection, index) {
                
                var deferred = $q.defer(),
                    that = this;

                searchService.getConfigPromise()
                .then(function(searchConfig) {

                    $http({
                        url: SOLRAPI + buildSolrBaseQuery(searchConfig) + '&' + buildQueryString(queries, filterQueries, collections, sortField, sortDirection, {
                            rows: 1,
                            start: index
                        })
                    })
                    .then(function(response) {
                        console.log('Solr reso', response.data)
                        deferred.resolve(response.data);
                    })
                    .catch(function(err) {
                        deferred.reject(err);
                        console.log('Error doing paginatedSearch', err);
                    });
                })
                .catch(function(err) {
                    deferred.reject(err);
                })

                return deferred.promise;
            }
        };

    };

    return solrService;

});
