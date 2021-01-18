define([

    'angular'

], function(ang) {

    var imageViewerOverlayDirective = ['$stateParams', '$state', '$window', function imageViewerDirective($stateParams, $state, $window) {

        return {

            restrict: 'E',

            scope: {
                canEdit: '=',
                postId: '='
            },

            template: require('./imageViewer.directive.overlay.tpl.html'),


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
                * Go to specific post, open in new window
                */
                scope.goToPost = function($event) {

                    var url = window.location.protocol + '//' + window.location.host + window.location.pathname + '#/task/' + $stateParams.taskId + '/page/' + $stateParams.pageId + '/post/' + scope.postId;
                    window.open(url);
                }
            }
        };
    }];

    return imageViewerOverlayDirective;

});
