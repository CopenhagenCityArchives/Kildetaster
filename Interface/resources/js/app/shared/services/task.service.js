define([


], function() {

    var taskService = /*@ngInject*/ function taskService($http, $cacheFactory, $q, $filter) {

        var baseUrl = '/resources/mock/',
            cache = $cacheFactory('taskCache');

        /**
         * Load all available task details, store in cache for quick retrieval
         */
        function getTaskData() {

            return $http.get(baseUrl + 'tasks.json').then(function(response) {
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
            getTask: function getProject(id) {

                var deferred = $q.defer(),
                    found;

                if (angular.isUndefined(cache.get('all'))) {

                    getTaskData().then(function(response) {

                        found = $filter('filter')(response, function(project) {
                            return project.id === id;
                        });
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
            }

        };

    };

    return taskService;

});
