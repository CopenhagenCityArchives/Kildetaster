define([
    'jquery',
    'bootstrap-carousel',
], function($, bs) {
        
    var galleryDirective = [function galleryDirective() {
        return {
            restrict: 'E',

            scope: {
                images: '='
            },

            template: require('./gallery.directive.tpl.html'),
            
            controller:  ['$scope', function($scope) {

                $scope.imageObjects = $scope.images.map(function(image) {
                    return {
                        zoomInFn: null,
                        zoomOutFn: null,
                        fullPageFn: null,
                        imageUrl: image
                    }
                })

                $scope.arrayLength = $scope.images.length;
                $scope.activeImage = 0;

                $("#source-gallery").on('slid.bs.carousel', function () {
                    var index = $('.carousel-item.active').index();
                    $scope.activeImage = index;
                    $(".carousel-indicators li.active").removeClass('active')
                    $(".carousel-indicators li:nth-child("+ (index + 1) +")").addClass('active');

                });

                $scope.slideNext = function() {
                    angular.element('#source-gallery').carousel('next');
                }

                $scope.slidePrev = function() {
                    angular.element('#source-gallery').carousel('prev');
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