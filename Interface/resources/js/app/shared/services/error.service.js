define([


], function() {

    var errorService = /*@ngInject*/ function errorService($http, $q, $filter, API, JSONURL) {

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

            createErrorReport: function createErrorReport(data) {
                return $http({
                    url: API + '/errorreports',
                    method: 'POST'
                })
                .then(function(response) {
                    console.log(response);
                })
                .catch(function(err) {
                    console.log('Error creating error report', err);
                });
            }

        };

    };

    return errorService;

});