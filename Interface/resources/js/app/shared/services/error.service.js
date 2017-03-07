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

            /**
            * Create an error report
            */
            createErrorReport: function createErrorReport(params) {

                var deferred = $q.defer();

                $http({
                    url: API + '/errorreports',
                    method: 'POST',
                    data: params
                })
                .then(function(response) {
                    deferred.resolve(response.data);
                })
                .catch(function(err) {
                    //console.log('Error creating error report', err);
                    deferred.reject(err);

                });

                return deferred.promise;
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

                var deferred = $q.defer();

                $http({
                    url: API + '/errorreports',
                    method: 'PATCH',
                    data: params
                })
                .then(function(response) {

                    deferred.resolve(response);
                    console.log('Error reports updated')
                })
                .catch(function(err) {
                    deferred.reject(err);
                    console.log('Error editing error reports', err);
                });

                return deferred.promise;
            }

        };

    };

    return errorService;

});
