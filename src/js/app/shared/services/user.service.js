define([


], function() {

    var userService = /*@ngInject*/ function userService($q, $http, API_URL) {

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
                })
                .then(function(response) {
                    return response.data;
                })
                .catch(function(err) {
                    console.log('err', err);

                });

            },

            /**
            *
            */
            getUserActivities: function(params) {

                return $http({
                    url: API_URL + '/useractivities',
                    method: 'GET',
                    params: params
                })
                .then(function(response) {
                    return response.data;
                })
                .catch(function(err) {
                    console.log('Error getting user activities', err);
                });
            },

            getUserInfo: function getUserInfo(userId) {

                if (!userId) {
                    throw new Error('getUserInfo: No userId given');
                }

                return $http({
                    url: API_URL + '/users/' + userId,
                    method: 'GET',
                    cache: true
                }).then(function(response) {
                    return response.data;
                })
                .catch(function(err) {
                    console.log('Error getting user info', err);
                });
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

    };

    return userService;

});
