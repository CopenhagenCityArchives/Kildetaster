define([


], function () {

    var taskService = /*@ngInject*/ function taskService($http, $cacheFactory, $q, $filter, API_ENDPOINT) {

        var cache = $cacheFactory('taskCache');

        /**
         * Load all available task details, store in cache for quick retrieval
         */
        function getTaskData() {

            return $http({
                method: 'GET',
                url: API_ENDPOINT + '/tasks',
                params: {

                }
            }).then(function (response) {

                cache.put('all', response.data);
                return response.data;
            });
        }

        return {

            /**
             * Lookup a specific task
             * @param {int} the id of the task to look up
             *
             * @return {promise} That resolves with the data for the task
             */
            getTask: function getTask(id) {

                var deferred = $q.defer(),
                    url = API_ENDPOINT + '/tasks/';

                $http.get(url + id).then(function (response) {
                    deferred.resolve(response.data);
                });

                return deferred.promise;
            },

            getTasks: function getProjects() {

                var deferred = $q.defer();

                if (angular.isUndefined(cache.get('all'))) {
                    getTaskData().then(function (response) {
                        deferred.resolve(response);
                    });
                } else {
                    deferred.resolve(cache.get('all'));
                }

                return deferred.promise;
            },

            getUnits: function getUnits(params) {

                var deferred = $q.defer();

                if (params.index_active === undefined || params.index_active === null) {
                    params.index_active = 1;
                }

                $http({
                    url: API_ENDPOINT + '/tasksunits',
                    method: 'GET',
                    params: params
                })
                    .then(function (response) {
                        deferred.resolve(response.data);
                    })
                    .catch(function (err) {
                        console.log('Error getting units', err);
                    });

                return deferred.promise;

            },

            getNextAvailablePage: function getNextAvailablePage() {
                var deferred = $q.defer();

                //TODO add correct url
                deferred.resolve({
                    pageId: 2
                });

                return deferred.promise;
            }

        };

    };

    return taskService;

});
