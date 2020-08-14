define([


], function() {

    var pageService = ['$http', '$q', 'API_URL', function pageService($http, $q, API_URL) {

        /**
        * Load all available page details
        */
        function getPageData(params) {
            
            var endPoint = API_URL + '/pages';

            return $http({
                method: 'GET',

                url: endPoint,
                params: params
            }).then(function(response) {
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
            getPageById: function getPage(id, taskId) {

                var deferred = $q.defer();
                getPageData({
                    page_id: id,
                    task_id: taskId
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
            getPageByNumber: function(taskId, pageNumber, unitId) {

                var deferred = $q.defer();

                getPageData({
                    page_number: pageNumber,
                    unit_id: unitId,
                    task_id: taskId
                }).then(function(response) {
                    deferred.resolve(response);
                }).catch(function(err) {
                    console.log('Error getting page by number', err);
                });
        
                return deferred.promise;

            },

            getNextAvailablePage: function getNextAvailablePage(params) {

                var deferred = $q.defer();

                $http({
                    url: API_URL + '/pages/nextavailable',
                    params: params
                })

                .then(function(response) {
                    deferred.resolve(response.data);
                })
                .catch(function(err) {
                    deferred.reject(err);
                    console.log('Get next page error', err);
                });

                return deferred.promise;
            },

            pageIsDone: function pageIsDone(params) {

                return $http({
                    url: API_URL + '/taskspages',
                    method: 'PATCH',
                    params: params,
                    data: {
                        "is_done": 1
                    },
                    authorizeRequest: true
                })
                .then(function(response) {
                    return response.data;
                })
                .catch(function(err) {
                    console.log('Error setting page as done', err);
                });

            }


        };

    }];

    return pageService;

});