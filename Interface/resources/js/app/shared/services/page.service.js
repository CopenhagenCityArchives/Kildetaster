define([


], function() {

    var pageService = /*@ngInject*/ function pageService($http, $cacheFactory, $q, $filter, API, JSONURL) {

        var cache = $cacheFactory('pageCache');

        /**
        * Load all available project details, store in cache for quick retrieval
        */
        function getPageData(params) {
            
            var endPoint = API + '/pages';

            return $http({
                method: 'GET',
                url: endPoint,
                params: params
            }).then(function(response) {
                //cache.put('all', response.data);
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
            getPageById: function getPage(id) {

                var deferred = $q.defer();
                getPageData({
                    page_id: id
                }).then(function(response) {
                    deferred.resolve(response);
                });

                return deferred.promise;

            },

            /**
            * Lookup a specific project
            * @param {int} the pageNumber of the page to look up
            * @param {int} The id of the unit to get the page from
            *
            * @return {promise} That resolves with the data for the project
            */
            getPageByNumber: function(pageNumber, unitId) {

                var deferred = $q.defer();

                getPageData({
                    page_number: pageNumber,
                    unit_id: unitId
                }).then(function(response) {
                    deferred.resolve(response);
                }).catch(function(err) {
                    console.log('Error getting page by number', err);
                });
        
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

            },

            getNextAvailablePage: function getNextAvailablePage(params) {

                var deferred = $q.defer();

                $http({
                    url: API + '/pages/nextavailable',
                    params: params
                })

                .then(function(response) {
                    deferred.resolve(response);
                })
                .catch(function(err) {
                    console.log('Get next page error', err);
                });

                return deferred.promise;
            }


        };

    };

    return pageService;

});