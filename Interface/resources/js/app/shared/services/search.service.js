define([

], function() {

    var searchService = /*@ngInject*/ function stepService($q, $http, API, JSONURL, $filter) {

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

        /**
        *
        * @return {array} A list of the fields that are facetable
        */
        function buildFacetsForQuery(config) {
            var arr = [];
            config.forEach(function(field) {
                if (field.facetable === 1) {
                    arr.push(field.solr_name);
                }
            });
            return arr;
        }


        /**
        *
        */
        function buildQueryString(query, facets, params) {

            var rtn = [];

            facets = facets || [];

            var options = {
                'wt': 'json',
                'indent': true,
                'q': buildSolrQuery(query),
                //Include facet information
                'facet': true,
                'facet.mincount': 1,
                //Sort facets on number of hits
                'facet.sort': 'count',
                //Default order by
                'sort': 'lastname asc, firstnames asc'
                //Number of results
                //'rows': 0,
                //Index to start from
                //'start': 0
            };

            params = angular.extend(options, params);

            for (var param in params) {
                if (params.hasOwnProperty(param)) {
                    rtn.push(param + '=' + params[param]);
                }
            }

            if (angular.isArray(facets) && facets.length > 0) {
                facets = buildFacetsForQuery(facets);

                facets.forEach(function(facet) {
                    rtn.push('facet.field' + '=' + facet);
                });
            }

            return rtn.join('&');
        }

        var index = 0;

        return {

            //Reference to current search configuration, enables us to run other requests using the same query
            currentSearchConfig: null,
            currentIndex: 0,

            search: function search(query, facets, params) {

                var jsonSource = useReal ? API + '/search' : JSONURL + '/search/results.json';

                this.currentSearchConfig =  {
                    query: query,
                    facets: facets,
                    params: params
                };

                return $http({
                    url: jsonSource + '?' + buildQueryString(query, facets, params),
                    method: 'GET'
                })

                .then(function(response) {
                    return response.data;
                })

                .catch(function(err) {
                    //Flash.create('danger', 'searchService:getData: Could not get step data');
                    return [];
                });
            },

            paginatedSearch: function(query) {

                var jsonSource = API + '/search';

                return $http({
                    url: jsonSource + '?' + buildQueryString(query, [], {
                        rows: 1,
                        start: this.currentIndex
                    })
                })
                .then(function(response) {
                    return response.data;
                })
                .catch(function(err) {
                    console.log('Error doing paginatedSearch', err);
                });

            },

            getFields: function getFields() {

                var jsonSource = useReal ? API + '/searchconfig' : JSONURL + '/search/fields.json';

                return $http({
                    url: jsonSource,
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
            },

            filterQuery: function (query, params) {

                var q = buildSolrQuery(query);

                var options = {
                    q: q,
                    facet: 'on',
                    'facet.field': params.field,
                    fq: params.field + ':"' + params.data + '"',
                    wt: 'json',
                    indent: true,
                };

                return $http({
                    url: API + '/search?' + buildQueryString(query, [], options)
                })
                .then(function(response) {
                    return response.data;

                })
                .catch(function(err) {
                    console.log('Error filtering search', err);
                    alert(err.data);
                });
            }
        };

    };

    return searchService;

});
