define([


], function() {

    var pageService = /*@ngInject*/ function pageService($http, $cacheFactory, $q, $filter, JSONURL) {

        var cache = $cacheFactory('pageCache');

        /**
        * Load all available project details, store in cache for quick retrieval
        */
        function getProjectData() {

            var useReal = false;

            var endPoint = 'http://kbhkilder.dk/1508/stable/api/units';
            
            endPoint = useReal ? endPoint : JSONURL + 'page.json';
 
            return $http({
                method: 'GET',
                url: endPoint,
                params: {
                    collection_id: 1,
                    task_id: 1
                }
            }).then(function(response) {
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

            },

            getPageUpdate: function getPage(id, baseUrl) {

                var deferred = $q.defer(),
                    found;

                $http.get(JSONURL + 'pageEditArea.json').then(function(response) {
                    found = $filter('filter')(response.data, function(project) {
                            return project.id === id;
                        });

                    deferred.resolve(found[0]);
                });

                return deferred.promise;

            }


        };

    };

    return pageService;

});