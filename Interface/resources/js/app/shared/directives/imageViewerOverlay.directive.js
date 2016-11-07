define([

    'angular'

], function(ang) {

    var imageViewerOverlayDirective = /*@ngInject*/ function imageViewerDirective($stateParams, $state, $window) {

        return {

            restrict: 'E',

            scope: {
                canEdit: '=',
                postId: '='
            },

            templateUrl: 'shared/directives/imageViewer.directive.overlay.tpl.html',


            link: function(scope, element, attrs) {

                scope.$watch('canEdit', function(newval, oldval) {
                    if (newval === true) {
                        scope.overlayClass = 'imageViewer__can-edit';
                    }
                    else {
                        scope.overlayClass = 'imageViewer__done'
                    }
                });

                /**
                * Go to specific post
                */
                scope.goToPost = function($event) {

                    $state.go('editor.page.update', {
                        taskId: $stateParams.taskId,
                        pageId: $stateParams.pageId,
                        postId: scope.postId
                    }, {
                        //Force state to reload, ie. fetch data again
                        reload: true
                    });
                }
            }
        };
    };

    return imageViewerOverlayDirective;

});
