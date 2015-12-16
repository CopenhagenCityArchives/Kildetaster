define([


], function() {

    var errorService = /*@ngInject*/ function updateService($http, $q, $filter, JSONURL) {

        return {

            getData: function getData() {
   
                return $http.get(JSONURL + '/errors.json')
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