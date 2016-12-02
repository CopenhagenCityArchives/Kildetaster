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
                    return response.data;
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
                    response.data.forEach(function(row){
                        if(row.superUserTime){
                           row.superUserTime  = new Date(row.superUserTime);
                        }
                    });

                    return response.data;
                })
                .catch(function(err) {
                    console.log('Error getting error reports', err);
                });
            },

            /**
            * Update error reports
            **/
            editErrorReports: function editErrorReports(params) {

                return $http({
                    url: API + '/errorreports',
                    method: 'PATCH',
                    data: params
                })
                .then(function(response) {
                    console.log('Error reports updated')
                })
                .catch(function(err) {
                    console.log('Error editing error reports', err);
                })
            }

        };

    };

    return errorService;

});
