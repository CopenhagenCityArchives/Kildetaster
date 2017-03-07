define([


], function() {

    var postService = /*@ngInject*/ function postService($http, API, $q) {

        return {

            getData: function getData(postId) {

                return $http.get(API + '/posts/' + postId)
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
            create: function create(data) {

                var deferred = $q.defer();

                $http.post(API + '/posts/', data)
                    .then(function(response) {
                        deferred.resolve(response);
                        console.log('response', response);
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
            update: function update(data, postId) {

                var deferred = $q.defer();

                $http.post(API + '/posts/' + postId, data)
                    .then(function(response) {
                        deferred.resolve(response);
                        console.log('response', response);
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
