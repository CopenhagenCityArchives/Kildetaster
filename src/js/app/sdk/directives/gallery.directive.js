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

                $("#source-gallery").on('slid.bs.carousel', function () {
                    var index = $('.carousel-item.active').index();
                    $scope.activeImage = index;
                    console.log('mid slide')
                    console.log('index: ', $scope.activeImage);
                });

                $scope.testSlide = function() {
                    angular.element('#source-gallery').carousel('next');
                }

                $scope.zoomOut = function() {
                    console.log($scope.imageObjects);
                    console.log($scope.imageObjects[$scope.activeImage]);
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