define([


], function() {

    var updateService = /*@ngInject*/ function updateService($http, $q, $filter) {

        var baseUrl = '/resources/mock/';

        return {

            getData: function getData() {
   
                return $http.get(baseUrl + '/stepsWithValues.json')
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