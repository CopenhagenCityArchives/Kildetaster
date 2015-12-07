define([


], function() {

    var pageService = function pageService($http, $cacheFactory, $q, $filter) {

        var baseUrl = '/resources/mock/',
            cache = $cacheFactory('pageCache');

        /**
        * Load all available project details, store in cache for quick retrieval
        */
        function getProjectData() {

            return $http.get(baseUrl + 'page.json').then(function(response) {
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
            getPage: function getPage(id) {

                var deferred = $q.defer(),
                    found;

                if (angular.isUndefined(cache.get('all'))) {
                    
                    getProjectData().then(function(response) {

                        found = $filter('filter')(response, function(project) {
                            return project.id === id;
                        });

                        deferred.resolve(found[0]);
                    });
                }
                else {
                    found = $filter('filter')(cache.get('all'), function(project) {
                            return project.id === id;
                        });
                    deferred.resolve(found[0]);
                }

                return deferred.promise;

            }

        };

    };

    return pageService;

});