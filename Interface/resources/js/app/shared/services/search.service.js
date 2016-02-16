define([




], function() {

    var searchService = /*@ngInject*/ function stepService($q, $http, JSONURL, $filter) {

        var useReal = false;

        return {

            search: function search() {


                var jsonSource = useReal ? 'http://kbhkilder.dk/1508/stable/api/' : JSONURL + '/search/results.json';
                
                return $http({
                    url: jsonSource,
                    params: {
                    }
                })

                .then(function(response) {
                    console.log(response);

                    return response.data;
                })

                .catch(function(err) {
                    //Flash.create('danger', 'searchService:getData: Could not get step data');
                    return [];
                });
            }

        };

    };

    return searchService;

});