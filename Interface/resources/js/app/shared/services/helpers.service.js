define([


], function() {

    var helpersService = /*@ngInject*/ function helpersService(API) {

        return {

            getImageUrlByPostId: function(postId) {
                return API + '/api/posts/' + postId + '/image';
           }

        };

    };

    return helpersService;

});