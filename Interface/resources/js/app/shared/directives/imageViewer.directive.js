define([

    'angular',
    'openseadragon',
    'libs/openseadragonselection',
    'libs/openseadragon-filtering'

], function(ang, OpenSeadragon, osdSelection) {

    "use strict";

    /**
     * Based on https://github.com/MaitreDede/angular-openseadragon
     */
    var openseadragonDirective = function openseadragonDirective() {

        return {

            restrict: "E",

            //replace: true,

            scope: {
                options: "=",
                name: "=",
                tilesource: "@",
                prefixUrl: "@"
            },

            //templateUrl: 'shared/directives/imageViewer.directive.tpl.html',

            controller: function($scope, $compile, $templateCache, $element, $rootScope) {
                

                var viewer, opts;


                //Openhttps://github.com/openseadragon/openseadragon/issues/759

                $scope.$on('selectionEnabled', function() {
                    console.log('selection is enabled');
                    viewer.zoomsPerClick = 1;
                    viewer.navigatorPosition = 'TOP_LEFT';
                });

                var template = $compile($templateCache.get('shared/directives/imageViewer.directive.tpl.html'))($scope);

                angular.element($element).replaceWith(template);

                function rebuildOptions() {

                    return angular.extend({}, $scope.options, {
                        showNavigator: true,
                        //navigatorPosition: "BOTTOM_LEFT",
                        element: angular.element('.target')[0],

                        zoomInButton: "zoom-in",
                        zoomOutButton: "zoom-out",
                        homeButton: "home",
                        fullPageButton: "full-page",
                        nextButton: "next",
                        previousButton: "previous",

                        navImages: {},

                        debugMode: false,

                        toggleButton: 'toggle-selection',
                        
                        //The "zoom distance" per mouse scroll or touch pinch. Note: Setting this to 1.0 effectively disables the mouse-wheel zoom feature 
                        //(also see gestureSettings[Mouse|Touch|Pen].scrollToZoom}).
                        zoomPerScroll: 1.0,

                        overlays: [{
                            px: 500,
                            py: 100,
                            width: 125,
                            height: 125,
                            className: 'imageViewer__done'
                        }]
                    });
                }
                

                $scope.$watchCollection('options', function(newVal, oldVal) {
                    console.log('watching options', newVal);
                    if (newVal !== oldVal && newVal !== null) {
                        rebuildOptions();
                    }
                    console.log(viewer);
                });


                opts = rebuildOptions();

                //Selection plugin
                //https://github.com/picturae/openseadragonselection
                viewer = OpenSeadragon(opts);

                //var sel = new OpenSeadragon.SelectionRect(200, 300, 400, 400, 0);

                //console.log(sel); //388, 442, 800, 700, 0

                //Selection plugin
                //https://github.com/picturae/openseadragonselection


                viewer.selection({
                    onSelection: function(rect) {

                        //https://github.com/picturae/openseadragonselection/issues/7
                        var converted = viewer.viewport.imageToViewportRectangle(rect);

                        viewer.addOverlay({
                            element: $('<div class="imageViewer__progress"></div>')[0],
                            //location: new OpenSeadragon.Rect(rect.x, rect.y, rect.width, rect.height, rect.rotation)
                            location: converted
                        });

                        viewer.viewport.fitBounds(converted, true);
                    },
                    //Initial selection
                    rect: new OpenSeadragon.SelectionRect(0, 0.75, 0.5, 0.25),
                    toggleButton: 'toggle-selection',
                    //showSelectionControl: true
                });


                //Cleanup
                $scope.$on('destroy', function() {
                    viewer.destroy();
                });


            },

            link: function(scope, element, attrs) {

                /*
                //Ids
                zoomInButton:   "zoom-in",
                zoomOutButton:  "zoom-out",
                homeButton:     "home",
                fullPageButton: "full-page",
                nextButton:     "next",
                previousButton: "previous",
                */
                return;
                //Create options object
                var opts = angular.extend({}, scope.options, {
                    id: "openseadragon-" + Math.random(),
                    //element: element[0],
                    element: $('div')[0],
                    //toolbar: toolsDiv
                });

                if (attrs.tilesource) {
                    opts.tileSources = [attrs.tilesource];
                }

                if (attrs.prefixUrl) {
                    opts.prefixUrl = attrs.prefixUrl;
                }

                //Create the viewer
                scope.osd = OpenSeadragon(opts);

                //Create a wrapper
                var wrapper = {
                    setFullScreen: function(fullScreen) {
                        scope.osd.setFullScreen(fullScreen);
                    },
                    forceRedraw: function() {
                        scope.osd.forceRedraw();
                    },
                    mouse: {
                        position: null,
                        imageCoord: null,
                        viewportCoord: null,
                    },
                    zoom: 0,
                    viewport: {
                        bounds: null,
                        center: null,
                        rotation: 0,
                        zoom: 0,
                    }
                };

                //if @name is set, put the wrapper in the scope and handle the events
                var zoomHandler = null;
                var updateViewportHandler = null;

                if (attrs.name) {

                    //Make the OSD available to parent scope
                    scope.$parent[attrs.name] = wrapper;

                    //Define event handlers
                    zoomHandler = function(e) {
                        scope.$apply(function() {
                            wrapper.zoom = e.zoom;
                        });
                    };

                    updateViewportHandler = function(e) {
                        scope.$apply(function() {
                            wrapper.viewport = {
                                bounds: scope.osd.viewport.getBounds(false),
                                center: scope.osd.viewport.getCenter(false),
                                rotation: scope.osd.viewport.getRotation(),
                                zoom: scope.osd.viewport.getZoom(false),
                            };
                        });
                    };

                    //Assign event handlers
                    scope.osd.addHandler("zoom", zoomHandler);
                    scope.osd.addHandler("update-viewport", updateViewportHandler);

                    //Add a mouse handler
                    scope.mouse = new OpenSeadragon.MouseTracker({

                        element: scope.osd.canvas,

                        enterHandler: function(e) {
                            if (scope.osd.viewport) {
                                var coord = OpenSeadragon.getElementPosition(scope.osd.canvas);
                                var pos = e.position.plus(coord);
                                var mouse = {
                                    position: pos,
                                    imageCoord: scope.osd.viewport.windowToImageCoordinates(pos),
                                    viewportCoord: scope.osd.viewport.windowToViewportCoordinates(pos),
                                };
                                scope.$apply(function() {
                                    wrapper.mouse = mouse;
                                });
                            }
                        },

                        moveHandler: function(e) {
                            if (scope.osd.viewport) {
                                var coord = OpenSeadragon.getElementPosition(scope.osd.canvas);
                                var pos = e.position.plus(coord);
                                var mouse = {
                                    position: pos,
                                    imageCoord: scope.osd.viewport.windowToImageCoordinates(pos),
                                    viewportCoord: scope.osd.viewport.windowToViewportCoordinates(pos),
                                };
                                scope.$apply(function() {
                                    wrapper.mouse = mouse;
                                });
                            }
                        },

                        exitHandler: function(e) {
                            scope.$apply(function() {
                                wrapper.mouse.position = null;
                                wrapper.mouse.imageCoord = null;
                                wrapper.mouse.viewportCoord = null;
                            });
                        },
                    });

                    scope.mouse.setTracking(true);
                }

                //When element is destroyed, destroy the viewer
                element.on('$destroy', function() {

                    //if @nam eis set, remove it from parent scope, and remove event handlers
                    if (attrs.name) {
                        //Remove from parent scope
                        scope.$parent[attrs.name] = null;

                        //Destroy mouse handler
                        scope.mouse.destroy();

                        //Remove event handlers
                        scope.osd.removeHandler("zoom", zoomHandler);
                        scope.osd.removeHandler("update-viewport", updateViewportHandler);
                    }

                    //Destroy the viewer
                    scope.osd.destroy();
                });
            },
        };
    };

    return openseadragonDirective;

});
