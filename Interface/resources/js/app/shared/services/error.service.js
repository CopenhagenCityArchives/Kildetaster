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


            createErrorReport: function createErrorReport(params) {

                return $http({
                    url: API + '/errorreports',
                    method: 'POST',
                    data: params
                })
                .then(function(response) {
                    console.log(response);
                })
                .catch(function(err) {
                    console.log('Error creating error report', err);
                });
            },

            /**
            * Both on a task, but also for a specifik user
            */
            getErrorReports: function getErrorReports(params) {
                
                return $http({
                    url: API + '/errorreports',
                    method: 'GET',
                    params: params
                })
                .then(function(response) {
                    return response.data;
                })
                .catch(function(err) {
                    console.log('Error getting error reports', err);
                });
            }

        };

    };

    return errorService;

});