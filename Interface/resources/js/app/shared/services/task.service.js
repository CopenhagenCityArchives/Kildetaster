define([


], function() {

    var taskService = /*@ngInject*/ function taskService($http, $cacheFactory, $q, $filter, JSONURL) {

        var cache = $cacheFactory('taskCache');

        /**
         * Load all available task details, store in cache for quick retrieval
         */
        function getTaskData() {
            
            var useReal = false;

            var endPoint = useReal ? 'http://kbhkilder.dk/1508/stable/api/tasks': JSONURL + 'tasks.json';

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
                    url = 'http://kbhkilder.dk/1508/stable/api/tasks/';

                $http.get(url + id).then(function(response) {
                    deferred.resolve(response.data);
                });

                return deferred.promise;
            },           

            /**
             * Mock response
             */
            qgetTask: function getTask(id) {

                var deferred = $q.defer(),
                    found;

                if (angular.isUndefined(cache.get('all'))) {

                    getTaskData().then(function(response) {

                        found = $filter('filter')(response, function(project) {
                            return project.id == id;
                        });
                        console.log(found[0]);
                        deferred.resolve(found[0]);

                    });
                } else {
                    found = $filter('filter')(cache.get('all'), function(project) {
                        return project.id === id;
                    });
                    deferred.resolve(found[0]);
                }

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
