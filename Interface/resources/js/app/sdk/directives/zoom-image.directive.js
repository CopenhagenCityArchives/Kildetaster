define([

    'angular',
    'openseadragon',
    'libs/openseadragonselection',
    'libs/openseadragon-filtering'

], function(ang, OpenSeadragon, osdSelection, filtering) {


    var zoomImageDirective = function zoomImageDirective() {

        // Counter for how many times the directive has been used, used to build unique id's
        var num = 0;

        return {

            restrict: 'E',

            scope: {
                images: '='
            },

            controller: /*@ngInject*/ function ($scope, $compile, $templateCache, $element, $timeout) {
            
                // Store current unique number on the scope
                $scope.num = num;

                var viewer;

                //Prepare the template
                var template = $compile($templateCache.get('sdk/directives/zoom-image.directive.tpl.html'))($scope);
        
                //Add template to the dom
                angular.element($element).replaceWith(template);

                var opts = angular.extend({}, {

                    zoomInButton: "zoom-in",
                    zoomOutButton: "zoom-out",
                    homeButton: "home",
                    fullPageButton: "full-page",
                    nextButton: "next",
                    previousButton: "previous",

                    maxZoomPixelRatio: 4,

                    gestureSettingsMouse: {
                        scrollToZoom: true,
                        clickToZoom: true,
                        pinchToZoom: false

                    },

                    gestureSettingsTouch: {
                        scrollToZoom: true,
                        clickToZoom: true,
                        pinchToZoom: true
                    },

                    //Prefix for image paths
                    prefixUrl: '/resources/bower_components/openseadragon/built-openseadragon/openseadragon/images/',

                    toggleButton: 'toggle-selection',

                    navImages: {},

                    debugMode: false,

                    //The "zoom distance" per mouse scroll or touch pinch. Note: Setting this to 1.0 effectively disables the mouse-wheel zoom feature
                    //(also see gestureSettings[Mouse|Touch|Pen].scrollToZoom}).
                    //zoomPerScroll: 1.0

                }, $scope.options);

                $timeout(function() {

                    //Initialize the viewer
                    //viewer = OpenSeadragon(opts);
                    viewer = OpenSeadragon({

                        // Turn off default buttons on the viewer, as we dont need those
                        showNavigator: false,
                        showHomeControl: false,
                        showFullPageControl: true,

                        zoomInButton: "zoom-in-" + $scope.num,
                        zoomOutButton: "zoom-out-" + $scope.num,
                        homeButton: "home",
                        fullPageButton: "full-page-" + $scope.num,
                        nextButton: "next",
                        previousButton: "previous",

                        maxZoomPixelRatio: 4,

                        gestureSettingsMouse: {
                            scrollToZoom: true,
                            clickToZoom: true,
                            pinchToZoom: false

                        },

                        gestureSettingsTouch: {
                            scrollToZoom: true,
                            clickToZoom: true,
                            pinchToZoom: true
                        },

                        element: document.querySelector('#zoom-image-' + $scope.num + '-' + '0' ),
                        tileSources: {
                            type: 'image',
                            url: 'http://politietsregisterblade.dk/registerblade/6/0002/03161A.jpg'
                        },
                    });

                });

                // Increment the counter for other instances of the directive
                num++;
            }

        }
    };

    return zoomImageDirective;
});
