define([

    'angular',
    'openseadragon',
    'libs/openseadragonselection',
    'libs/openseadragon-filtering'

], function(ang, OpenSeadragon, osdSelection, filtering) {


    var zoomImageDirective = function /*@ngInject*/ zoomImageDirective() {

        return {

            restrict: 'E',

            scope: {
                imageUrl: '='
            },


            controller: /*@ngInject*/ function($scope, $compile, $templateCache, $element) {

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

                //Initialize the viewer
                //viewer = OpenSeadragon(opts);
                viewer = OpenSeadragon({

                    showNavigator: false,

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

                    element: angular.element('.zoom-image__target')[0],

                    tileSources: {
                        type: 'image',
                        url: $scope.imageUrl
                    },
                })
            }

        }
    };

    return zoomImageDirective;
});
