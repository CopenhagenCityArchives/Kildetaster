define([


], function() {

    var errorService = ['$http', '$q', 'API_URL', 'ERROR_REPORT_CONFIG_URL', function errorService($http, $q, API_URL, ERROR_REPORT_CONFIG_URL) {

        return {

            
            getConfig: function getConfig() {

                return $http.get(ERROR_REPORT_CONFIG_URL)
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
                    url: API_URL + '/errorreports',
                    method: 'POST',
                    data: params,
                    // authorizeRequest: true
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
                    url: API_URL + '/errorreports',
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
                    url: API_URL + '/errorreports',
                    method: 'PATCH',
                    data: params,
                    authorizeRequest: true
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

    }];

    return errorService;

});
