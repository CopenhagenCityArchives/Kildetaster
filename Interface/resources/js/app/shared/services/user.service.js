define([


], function() {

    var userService = /*@ngInject*/ function userService($http, API) {

        return {

            /**
             * Lookup a specific task
             * @param {object} the id of the task to look up
             *   With either a taskId or an unitId
             *
             * @return {promise} That resolves with the data for the task
             */
            getUsers: function getUsers(unitId) {

                return $http({
                    url: API + '/activeusers',
                    method: 'GET',
                    params: {
                        unit_id: unitId
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
                    url: API + '/useractivities',
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
                    url: API + '/users/' + userId,
                    method: 'GET',
                    cache: true
                }).then(function(response) {
                    return response.data;
                })
                .catch(function(err) {
                    console.log('Error getting user info', err);
                });
            }

        };

    };

    return userService;

});
