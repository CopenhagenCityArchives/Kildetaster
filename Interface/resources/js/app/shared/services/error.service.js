define([


], function() {

    var errorService = /*@ngInject*/ function updateService($http, $q, $filter) {

        var baseUrl = '/resources/mock/';

        return {

            getData: function getData() {
   
                return $http.get(baseUrl + '/errors.json')
                    .then(function(response) {
                        return response.data;
                    })
                    .catch(function(err) {
                        throw new Error('errorService:getData: ' + err);
                    });
            },

        };

    };

    return errorService;

});