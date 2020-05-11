define([


], function() {

    var postService = /*@ngInject*/ function postService($http, API_ENDPOINT, $q) {

        return {

            getData: function getData(postId) {

                return $http.get(API_ENDPOINT + '/posts/' + postId)
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
                    method: "post",
                    url: API_ENDPOINT + '/posts/',
                    params: {task_id: taskId},
                    data: data
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
                    method: "patch",
                    url: API_ENDPOINT + '/posts/' + postId,
                    params: {task_id: taskId},
                    data: data
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

    };

    return postService;

});
