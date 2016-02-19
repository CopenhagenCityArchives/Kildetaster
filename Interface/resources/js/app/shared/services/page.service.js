define([


], function() {

    var pageService = /*@ngInject*/ function pageService($http, $cacheFactory, $q, $filter, JSONURL) {

        var cache = $cacheFactory('pageCache');

        /**
        * Load all available project details, store in cache for quick retrieval
        */
        function getProjectData(params) {

            var useReal = true;
            
            var endPoint = 'http://kbhkilder.dk/1508/stable/api/pages';
            
            params = params || {};
            
            endPoint = useReal ? endPoint : JSONURL + 'page.json';
 
            return $http({
                method: 'GET',
                url: endPoint,
                params: params,
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
                    
                    //?unit_id=1&page_number=12
                    getProjectData({
                        unit_id: 1,
                        page_number: 12
                    }).then(function(response) {

                        console.log("getpage response", response);

                        deferred.resolve(response[0]);

                        // found = $filter('filter')(response, function(project) {
                        //     return project.id === id;
                        // });

                        // deferred.resolve(found[0]);
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