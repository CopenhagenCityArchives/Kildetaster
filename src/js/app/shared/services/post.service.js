define([


], function() {

    var postService = ['$http', 'API_URL', '$q', function postService($http, API_URL, $q) {

        return {

            getData: function getData(postId) {

                return $http.get(API_URL + '/posts/' + postId)
                    .then(function(response) {
                        return response.data;
                    })
                    .catch(function(err) {
                        throw new Error('postService:getData: ' + err);
                    });
            },

            /**
            * Create new post
            *
            * @param taskId {int}
            *   The task id.
            * 
            * @param data {object}
            *   Format:
            *       {
            *          "x": 0.231,
            *           "y": 0.552,
            *           "height": 0.12,
            *           "width" : 0.1,
            *           "page_id" : 1423
            *       }
            * @return {Promise}
            *

            */
            create: function create(taskId, data) {

                var deferred = $q.defer();

                $http({
                    method: "POST",
                    url: API_URL + '/posts/',
                    params: {task_id: taskId},
                    data: data,
                    authorizeRequest: true
                })
                .then(function(response) {
                    deferred.resolve(response);
                    return response;
                })
                .catch(function(err) {
                    deferred.reject(err);
                });

                return deferred.promise;
            },

            /**
            * Update a given post, with new data
            * 
            * @param taskId {int}
            *   The task id.
            * 
            * @param data {object}
            *   Format:
            *       {
            *          "x": 0.231,
            *           "y": 0.552,
            *           "height": 0.12,
            *           "width" : 0.1,
            *           "page_id" : 1423
            *       }
            * @param postId {int} The id of the post to update
            *
            * @return {Promise}
            */
            update: function update(taskId, data, postId) {

                var deferred = $q.defer();

                $http({
                    method: "PATCH",
                    url: API_URL + '/posts/' + postId,
                    params: {task_id: taskId},
                    data: data,
                    authorizeRequest: true
                })
                .then(function(response) {
                    deferred.resolve(response);
                    return response;
                })
                .catch(function(err) {
                    deferred.reject(err);
                });

                return deferred.promise;
            },


        };

    }];

    return postService;

});
