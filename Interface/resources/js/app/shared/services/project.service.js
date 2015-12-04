define([


], function() {

    var projectService = function projectService($http, $cacheFactory, $q, $filter) {

        var baseUrl = '/resources/mock/',
            cache = $cacheFactory('projectCache');

        /**
         * Load all available project details, store in cache for quick retrieval
         */
        function getProjectData() {

            return $http.get(baseUrl + 'project.json').then(function(response) {
                cache.put('all', response.data);
                return response.data;
            });
        }

        return {

            /**
             * Lookup a specific project
             * @param {int} the id of the project to look up
             *
             * @return {promise} That resolves with the data for the project
             */
            getProject: function getProject(id) {

                var deferred = $q.defer(),
                    found;

                if (angular.isUndefined(cache.get('all'))) {

                    getProjectData().then(function(response) {

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

            getProjects: function getProjects() {
                
                var deferred = $q.defer();

                if (angular.isUndefined(cache.get('all'))) {

                    getProjectData().then(function(response) {
                        deferred.resolve(response);
                    });
                } else {
                    deferred.resolve(cache.get('all'));
                }

                return deferred.promise;
            }

        };

    };

    return projectService;

});
