define([




], function() {

    var searchService = /*@ngInject*/ function stepService($q, $http, JSONURL, $filter) {

        var useReal = true;

        return {

            search: function search(query, facets) {

                var jsonSource = useReal ? 'http://kbhkilder.dk/1508/stable/api/search' : JSONURL + '/search/results.json';
                
                var params = {
                    'wt': 'json',
                    'indent': true,
                    'q': query,
                    //Include facet information
                    'facet': true,
                    'facet.mincount': 1,
                    //Sort facets on number of hits
                    'facet.sort': 'count'
                };

                /**
                *
                */
                function buildQueryString(params) {

                    var rtn = [];

                    for (var param in params) {
                        if (params.hasOwnProperty(param)) {
                            rtn.push(param + '=' + params[param]);
                        }
                    }

                    facets.forEach(function(facet) {
                        rtn.push('facet.field' + '=' + facet);

                    });
                    return rtn.join('&');
                }

                return $http({
                    url: jsonSource + '?' + buildQueryString(params)
                })

                .then(function(response) {
                    return response.data;
                })

                .catch(function(err) {
                    //Flash.create('danger', 'searchService:getData: Could not get step data');
                    return [];
                });
            },

            getFields: function getFields() {

                var jsonSource = useReal ? 'http://kbhkilder.dk/1508/stable/api/searchconfig?collection_id=1' : JSONURL + '/search/fields.json';

                return $http({
                    url: jsonSource,
                    params: {
                        collection_id: 1
                    }
                })
                .then(function(response) {
                    return response.data;
                })

                .catch(function(err) {
                    console.log('Error getting search fields', err);
                });
            }

        };

    };

    return searchService;

});