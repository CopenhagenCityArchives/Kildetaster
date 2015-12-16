define([


], function() {

    var updateService = /*@ngInject*/ function updateService($http, $q, $filter, JSONURL) {

        return {

            getData: function getData(baseUrl) {
   
                return $http.get(JSONURL + '/stepsWithValues.json')
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