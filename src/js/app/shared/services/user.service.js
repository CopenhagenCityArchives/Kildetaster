define([


], function() {

    var userService = ['$q', '$http', 'API_URL', 'authService', function userService($q, $http, API_URL, authService) {

        return {
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
                    console.error('Error getting users:', err);
                });
            },

            /**
            *
            */
            getUserActivities: function() {
                return authService.getUser()
                .then(function(user) {
                    var apacs_user_id = user['https://kbharkiv.dk/claims/apacs_user_id'];
                    return $http({
                        url: API_URL + '/useractivities',
                        method: 'GET',
                        params: {user_id : apacs_user_id}
                    })
                })
                .then(function(response) {
                    return $q.resolve(response.data);
                });
            },

            getUserInfo: function(allowEmptyResponse) {
                return authService.getUser()
                .then(function(user) {
                    return $http({
                        url: API_URL + '/users/' + user['https://kbharkiv.dk/claims/apacs_user_id'],
                        method: 'GET',
                        cache: true
                    })
                })
                .then(function(response) {
                    return $q.resolve(response.data);
                })
                .catch(function(err) {
                    if (allowEmptyResponse) {
                        return $q.resolve({});
                    } else {
                        return $q.reject(err);
                    }
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

    }];

    return userService;

});
