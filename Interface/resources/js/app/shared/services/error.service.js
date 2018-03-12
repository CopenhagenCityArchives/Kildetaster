define([


], function() {

    var errorService = /*@ngInject*/ function errorService($http, $q, $filter, API, JSONURL, ERRORREPORCONFIGURL) {

        return {

            
            getConfig: function getConfig() {

                return $http.get(ERRORREPORCONFIGURL)
                    .then(function(response){
                        return response.data;
                    })
                    .catch(function(err){
                        throw new Error('errorService:getConfig: ' + err);
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
                    console.log('Error creating error report', err);
                    deferred.reject(err);

                });

                return deferred.promise;
            },

            /**
            * Both on a task, but also for a specific user
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
                            //var convertedTime = row.superUserTime.replace(" ", "T") + ".000Z";
                           row.superUserTime  = new Date(Date.parse(row.superUserTime.replace('-','/','g')));
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
