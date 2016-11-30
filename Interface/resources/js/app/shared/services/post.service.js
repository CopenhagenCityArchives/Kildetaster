define([


], function() {

    var postService = /*@ngInject*/ function postService($http, API) {

        return {

            getData: function getData(postId) {

                return $http.get(API + '/posts/' + postId)
                    .then(function(response) {
                        return response.data;
                    })
                    .catch(function(err) {
                        throw new Error('postService:getData: ' + err);
                    });
            }

        };

    };

    return postService;

});
