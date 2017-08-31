define([

], function() {

    var searchService = /*@ngInject*/ function searchService($q, $http, API, SOLRAPI, JSONURL, $filter) {

        var useReal = true;

        /**
        * Build the string that matches the current query
        */
        function buildSolrQuery(arr) {
            var rtn = [];

            arr.forEach(function(row) {

                if (row.field !== undefined && row.term) {
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
            var operator;

            operator = row.operator.replace('%f%', row.field.solr_name);
            operator = operator.replace('%q%', row.term)

            return operator;
        }

        function buildSolrFacetQuery(facets) {
            var rtn = [];

            if (facets) {

                angular.forEach(facets, function(facet, facetName) {
                    if (facets.hasOwnProperty(facetName)) {
                        rtn.push(facet.filterQuery.replace("%f%", facet.fieldName));
                    }
                });

            }
            //join with fq= because if we have multiple entries in the array, they should be seperatred by &, but all be fq
            //but since the buildQueryString function already prepares a fq, the first entry does not need this
            return rtn.join('&fq=');
        }

        /**
        *
        */
        function buildQueryString(query, facets, params) {

            var rtn = [];

            var options = {

                //The query for the search
                'q': buildSolrQuery(query),
                //The selected filters to use as facet query
                'fq': buildSolrFacetQuery(facets)

            };

            params = angular.extend(options, params);

            for (var param in params) {
                if (params.hasOwnProperty(param)) {
                    rtn.push(param + '=' + params[param]);
                }
            }

            return rtn.join('&');
        }

        var index = 0;

        return {

            //Reference to current search configuration, enables us to run other requests using the same query
            currentSearchConfig: null,
            currentIndex: 0,

            search: function search(query, facets, params) {

                var deferred = $q.defer();

                this.currentSearchConfig =  {
                    query: query,
                    facets: facets,
                    params: params
                };

                this.getSearchConfig()
                .then(function(searchConfig) {

                    var baseSolrQuery = searchConfig[0].solr_base_query;
                    return $http({
                        url: SOLRAPI + baseSolrQuery + '&' + buildQueryString(query, facets, params),
                        method: 'GET'
                    });
                })
                .then(function(response) {
                    deferred.resolve(response.data);
                })
                .catch(function(err) {
                    deferred.reject();
                });

                return deferred.promise;
            },

            paginatedSearch: function(query, facets) {

                var deferred = $q.defer(),
                    that = this;

                this.getSearchConfig().then(function(searchConfig) {

                    var baseSolrQuery = searchConfig[0].solr_base_query;

                    return $http({
                        url: SOLRAPI + baseSolrQuery + '&' + buildQueryString(query, facets, {
                            rows: 1,
                            start: that.currentIndex,
                            sort: that.currentSearchConfig.params.sort
                        })
                    })
                })

                .then(function(response) {
                    deferred.resolve(response.data);
                })
                .catch(function(err) {
                    console.log('Error doing paginatedSearch', err);
                });

                return deferred.promise;

            },

            /**
            *
            */
            getSearchConfig: function getSearchConfig() {

                return $http({
                    url: API + '/searchconfig',
                    params: {
                        collection_id: 1
                    },
                    cache: true
                })
                .then(function(response) {
                    return response.data;
                })

                .catch(function(err) {
                    console.log('Error getting search fields', err);
                });
            },

            /**
            * TODO: Move to own service
            */
            getPost: function getPost(postId) {

                return $http({
                    url: API + '/posts/' + postId
                })
                .then(function(response) {
                    return response.data;
                })
                .catch(function(err) {
                    console.log('Error getting post data', err);
                    alert(err.data);
                });
            }
        };

    };

    return searchService;

});
