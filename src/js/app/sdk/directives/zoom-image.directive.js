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
                images: '=',
                index: '='
            },

            controller: ['$scope', '$compile', '$templateCache', '$element', '$timeout', function($scope, $compile, $templateCache, $element, $timeout) {
            
                // Store current unique number on the scope
                $scope.num = num;
                var viewer;
                var imageArray = new Array();
                $scope.imageArray = imageArray;
                $scope.images.forEach(img => {
                    imageArray.push({
                        type: 'image',
                        url: img
                    })
                });

                //Prepare the template
                var template = $compile(require('./zoom-image.directive.tpl.html'))($scope);
        
                //Add template to the dom
                angular.element($element).replaceWith(template);

                // Customize error message
                OpenSeadragon.setString('Errors.OpenFailed', 'Der opstod en fejl under åbning af billedet. Prøv igen senere!');
                $timeout(function() {
                    //Initialize the viewer

                    viewer = OpenSeadragon({
                        
                        id: "zoom-image-" + $scope.num,
                        sequenceMode: true,

                        // Turn off default buttons on the viewer, as we dont need those
                        showNavigator: false,
                        showHomeControl: false,
                        showFullPageControl: true,
                        
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
                        
                        //element: document.querySelector('#zoom-image-' + $scope.num ),
                        /*tileSources: {
                            type: 'image',
                            url: $scope.image
                        },*/
                        tileSources: imageArray
                    });
                });

                // Increment the counter for other instances of the directive
                num++;
                $scope.images = [];
            }],

        }
    };

    return zoomImageDirective;
});
