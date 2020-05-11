define([


], function() {

    var updateService = /*@ngInject*/ function updateService($http, $q, $filter, JSON_URL) {

        return {

            getData: function getData(baseUrl) {
   
                return $http.get(JSON_URL + '/stepsWithValues.json')
                    .then(function(response) {
                        return response.data;
                    })
                    .catch(function(err) {
                        throw new Error('updateService:getData: ' + err);
                    });
            },

        };

    };

    return updateService;

});