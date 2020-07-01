define([
    'jquery',
], function($) {
        
    var galleryDirective = ['EDITOR_URL', function galleryDirective(EDITOR_URL) {
        return {
            restrict: 'E',

            scope: {
                images: '=',
                data: '='
            },

            template: require('./gallery.directive.tpl.html'),
            
            controller:  ['$scope', function($scope) {
                $scope.imageObjects = $scope.images.map(function(image) {
                    console.log("imageObject Refresh");
                    return {
                        zoomInFn: null,
                        zoomOutFn: null,
                        fullPageFn: null,
                        imageUrl: image
                    }
                })

                $scope.editorUrl = EDITOR_URL + '#/task/' + $scope.data.task_id + '/page/' + $scope.data.page_id + '/post/' + $scope.data.post_id;
                $scope.arrayLength = $scope.images.length;
                $scope.activeImage = 0;

                $scope.setActiveImage = function(direction) {

                    var index = $scope.activeImage;
                    //wait for the sliding to finish
                    //This is done to avoid index "getting out of sync" with the active image
                    $("#source-gallery").on('slid.bs.carousel', function () {
                        if (direction == 'prev') {
                            if (index > 0) {
                                index = $scope.imageObjects.length - 1;
                            } else {
                                index = index - 1;
                            }
                        }

                        else if (direction == 'next') {
                            if (index == $scope.imageObjects.length - 1) {
                                index = 0;
                            } else {
                                index = index + 1;
                            }
                        }
                        $scope.activeImage = index;
                    });

                }

                $scope.zoomOut = function() {
                    $scope.imageObjects[$scope.activeImage].zoomOutFn();
                }

                $scope.zoomIn = function() {
                    $scope.imageObjects[$scope.activeImage].zoomInFn();
                }

                $scope.fullPage = function() {
                    $scope.imageObjects[$scope.activeImage].fullPageFn();
                }
            }],
        }
    }];

    return galleryDirective;
});