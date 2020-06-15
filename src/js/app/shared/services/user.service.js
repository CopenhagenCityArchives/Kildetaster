define([


], function() {

    var userService = ['$q', '$http', 'API_URL', 'tokenService', function userService($q, $http, API_URL, tokenService) {

        return {

            /**
             * Lookup a specific task
             * @param {object} the id of the task to look up
             *   With either a taskId or an unitId
             *
             * @return {promise} That resolves with the data for the task
             */
            getUsers: function getUsers(unitId, taskId) {

                return $http({
                    url: API_URL + '/activeusers',
                    method: 'GET',
                    params: {
                        unit_id: unitId,
                        task_id: taskId
                    }
                }).then(function(response) {
                    return response.data;
                }).catch(function(err) {
                    console.log('err', err);

                });
            },

            /**
            *
            */
            getUserActivities: function() {
                var deferred = $q.defer();

                tokenService.getUserData()
                .then(function(userData){
                    $http({
                        url: API_URL + '/useractivities',
                        method: 'GET',
                        params: {user_id : userData.userId}
                    }).then(function(response) {
                        deferred.resolve(response.data);
                    }).catch(function(err) {
                        console.log('Error getting user activities', err);
                        deferred.reject();
                    });
                }).catch(function(err){
                    console.log('Error getting userData: ', err);
                    deferred.reject();
                });

                return deferred.promise;
            },

            getUserInfo: function(allowEmptyResponse) {
                allowEmptyResponse = allowEmptyResponse || false;
                var deferred = $q.defer();

                tokenService.getUserData(allowEmptyResponse)
                .then(function(userData){
                    if (allowEmptyResponse && !userData){
                        deferred.resolve({});
                    } else {
                        $http({
                            url: API_URL + '/users/' + userData.userId,
                            method: 'GET',
                            cache: true
                        }).then(function(response) {
                            response.data.user_id = response.data.id;
                            deferred.resolve(response.data);
                        }).catch(function(err) {
                            if (allowEmptyResponse){
                                console.log("Could not get user info, but empty response allowed. Returning {}");
                                deferred.resolve({});
                            }
                            console.log('Error getting user info', err);
                            deferred.reject();
                        });
                    }
                }).catch(function(err){
                    console.log('Error getting userData', err);
                    deferred.reject();
                });

                return deferred.promise;
            },

            getUserStatistics: function(since) {
                var deferred = $q.defer();

                $http({
                    url: API_URL + '/events/create/' + since,
                    method: 'GET',
                    cache: true
                }).then(function(response) {
                    deferred.resolve(response.data);
                }).catch(function(err) {
                    deferred.reject(err);
                });

                return deferred.promise;
            }

        };

    }];

    return userService;

});
