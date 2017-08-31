define([

], function() {

    var editorController = /*@ngInject*/ function editorController($scope, $state, Flash, pageService, taskData, pageData, $location, $timeout, $rootScope) {

        var convertedPosts = [];

        //Openseadragon does not like a property called id, as it tries to find the dom node with that id.
        //Hack to rename the property, backend should do this
        pageData.posts.forEach(function(post) {

            var obj = {
                className: post.className,
                complete:post.complete,
                height: post.height,
                pages_id: post.pages_id,
                postId: post.id,
                width: post.width,
                x: post.x,
                y: post.y,
                canEdit: post.user_can_edit
            };
            convertedPosts.push(obj);

        });

        $scope.options = {

            tileSources: {
                type: 'image',
                url: pageData.image_url,
                navigatorPosition: 'TOP_LEFT',
                //if we use the normal overlays property, overlays will be added with wrong values. We need to convert
                //the values from the backend - and to do that, we need the aspectRatio of the image. We therefore use
                //a custom property, and handle the convertion and adding of overlays in the imageViewer.directive
                //see the event handler on tile-loaded in imageViewer.directive
                deferredOverlays: convertedPosts
            },
            //If the page is marked as done, do not show selection, eventhough next_post might contain a valid position overlay object
            next_post: pageData.task_page[0].is_done === 1 ? false : pageData.next_post

        };

        $rootScope.$on('zoom-to-post', function(event, data) {

            // $scope.options.zoomToPost = data.postId;
            $scope.editArea = convertedPosts.find(function(post) {
                return post.postId === data.postId;
            });
        });

    };

    return editorController;

});
