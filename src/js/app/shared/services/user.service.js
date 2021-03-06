define([


], function() {

    var userService = ['$q', '$http', 'API_URL', 'authService', function userService($q, $http, API_URL, authService) {

        return {
            updateUserProfile: function updateUser(profilePatch) {
                return $http({
                    url: API_URL + '/user',
                    method: 'PATCH',
                    data: profilePatch,
                    authorizeRequest: true
                })
            },

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
                    return $http({
                        url: API_URL + '/useractivities',
                        method: 'GET',
                        params: {user_id : user.apacs_user_id}
                    })
                })
                .then(function(response) {
                    return $q.resolve(response.data);
                });
            },

            getUserInfo: function(allowEmptyResponse) {
                return authService.getUser(allowEmptyResponse)
                .then(function(user) {
                    if (!user) {
                        return $q.reject();
                    }

                    return $http({
                        url: API_URL + '/users/' + user.apacs_user_id,
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
