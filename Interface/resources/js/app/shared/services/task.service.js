define([


], function() {

    var taskService = /*@ngInject*/ function taskService($http, $cacheFactory, $q, $filter, JSONURL, API) {

        var cache = $cacheFactory('taskCache');

        /**
         * Load all available task details, store in cache for quick retrieval
         */
        function getTaskData() {
            

            var endPoint = useReal ? API + '/tasks': JSONURL + 'tasks.json';

            return $http({
                method: 'GET',
                url: endPoint,
                params: {

                }
            }).then(function(response) {

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
                    url = API + '/tasks/';

                $http.get(url + id).then(function(response) {
                    deferred.resolve(response.data);
                });

                return deferred.promise;
            },           

            getTasks: function getProjects() {
                
                var deferred = $q.defer();

                if (angular.isUndefined(cache.get('all'))) {
                    getTaskData().then(function(response) {
                        deferred.resolve(response);
                    });
                } else {
                    deferred.resolve(cache.get('all'));
                }

                return deferred.promise;
            },

            getUnits: function getUnits(params) {

                var deferred = $q.defer();

                params.index_active = 1;
                //params.collection_id = 1;
 //http://kbhkilder.dk/1508/stable/api/tasksunits?task_id=1&index_active=1
                $http({
                    url: API + '/tasksunits',
                    method: 'GET',
                    params: params
                })
                .then(function(response) {
                    deferred.resolve(response.data);
                })
                .catch(function(err) {
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
