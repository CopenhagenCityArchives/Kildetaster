define([

    'angular',
    'openseadragon',
    'openseadragonselection',
    'openseadragon-filtering'

], function(ang, OpenSeadragon, osdSelection, filtering) {


    var zoomImageDirective = function zoomImageDirective() {

        // Counter for how many times the directive has been used, used to build unique id's
        var num = 0;

        return {

            restrict: 'E',

            scope: {
                image: '=',
                index: '='
            },

            controller: ['$scope', '$compile', '$templateCache', '$element', '$timeout', function($scope, $compile, $templateCache, $element, $timeout) {
            
                // Store current unique number on the scope
                $scope.num = num;
                var viewer;

                //Prepare the template
                var template = $compile(require('./zoom-image.directive.tpl.html'))($scope);
        
                //Add template to the dom
                angular.element($element).replaceWith(template);

                $timeout(function() {
                    console.log('#zoom-image-' + $scope.index );
                    console.log($scope.image);
                    console.log('num');
                    console.log(num);
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
                        
                        //element: document.querySelector('#zoom-image-' + num + '-' + $scope.index ),
                        element: document.querySelector('#zoom-image-' + $scope.index ),
                        tileSources: {
                            type: 'image',
                            url: $scope.image
                        },
                    });
                });

                // Increment the counter for other instances of the directive
                num++;
            }]

        }
    };

    return zoomImageDirective;
});
