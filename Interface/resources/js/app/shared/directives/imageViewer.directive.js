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

            scope: {
                options: '=',
                onSelection: '&'
            },

            //templateUrl: 'shared/directives/imageViewer.directive.tpl.html',

            controller: function($scope, $compile, $templateCache, $element, $rootScope) {

                var viewer, opts;


                //Openhttps://github.com/openseadragon/openseadragon/issues/759

                $scope.$on('selectionEnabled', function() {
                    //console.log('selection is enabled');
                    viewer.zoomsPerClick = 1;
                    viewer.navigatorPosition = 'TOP_LEFT';
                });

                var template = $compile($templateCache.get('shared/directives/imageViewer.directive.tpl.html'))($scope);

                angular.element($element).replaceWith(template);


                function addClassToOverlay(overlayData) {

                    if (!angular.isArray(overlayData)) {
                        return [];
                    }
                    return overlayData.map(function(data) {
                        data.className = 'imageViewer__done';
                        return data;
                    });
                }
                //Add class to render overlays correctly
                $scope.options.tileSources.overlays = addClassToOverlay($scope.options.tileSources.overlays);

                $scope.$watchCollection('options', function(newVal, oldVal) {
                    //console.log('watching options', newVal);
                    if (newVal !== oldVal && newVal !== null) {
                        rebuildOptions();
                    }
                });

                opts = angular.extend({}, $scope.options, {

                        element: angular.element('.target')[0],

                        showNavigator: true,
                        navigatorPosition: "BOTTOM_LEFT",
                        navigatorWidth: 160,
                        navigatorHeight: 160,

                        zoomInButton: "zoom-in",
                        zoomOutButton: "zoom-out",
                        homeButton: "home",
                        fullPageButton: "full-page",
                        nextButton: "next",
                        previousButton: "previous",
                        
                        //Prefix for image paths
                        prefixUrl: '/resources/bower_components/openseadragon/built-openseadragon/openseadragon/images/',

                        toggleButton: 'toggle-selection',

                        navImages: {},

                        debugMode: false,

                        //The "zoom distance" per mouse scroll or touch pinch. Note: Setting this to 1.0 effectively disables the mouse-wheel zoom feature 
                        //(also see gestureSettings[Mouse|Touch|Pen].scrollToZoom}).
                        zoomPerScroll: 1.0

                    });

                //Initialize the viewer
                viewer = OpenSeadragon(opts);


                //Selection plugin
                //https://github.com/picturae/openseadragonselection
                viewer.selection({
                    onSelection: function(rect) {

                        //https://github.com/picturae/openseadragonselection/issues/7
                        var converted = viewer.viewport.imageToViewportRectangle(rect);

                        viewer.addOverlay({
                            element: $('<div class="imageViewer__progress"></div>')[0],
                            //location: new OpenSeadragon.Rect(rect.x, rect.y, rect.width, rect.height, rect.rotation)
                            location: converted,
                        });

                        //Zoom viewer to the selected area
                        viewer.viewport.fitBounds(converted, true);

                        //If the given onSelection property is a function, call it
                        if (angular.isFunction($scope.onSelection)) {
                            $scope.onSelection();
                        }
                    },
                    //Initial selection
                    rect: new OpenSeadragon.SelectionRect(0.25, 0.6, 0.5, 0.25),
                    
                    toggleButton: 'toggle-selection',
                    
                    //showSelectionControl: true,
                    
                    prefixUrl: '/resources/images/',
                    
                    navImages: { // overwrites OpenSeadragon's options
                        selection: {
                            REST: 'selection_rest.png',
                            GROUP: 'selection_grouphover.png',
                            HOVER: 'selection_hover.png',
                            DOWN: 'selection_pressed.png'
                        },
                        selectionConfirm: {
                            REST: 'selection_confirm_rest.png',
                            GROUP: 'selection_confirm_grouphover.png',
                            HOVER: 'selection_confirm_hover.png',
                            DOWN: 'selection_confirm_pressed.png'
                        },
                        selectionCancel: {
                            REST: 'selection_cancel_rest.png',
                            GROUP: 'selection_cancel_grouphover.png',
                            HOVER: 'selection_cancel_hover.png',
                            DOWN: 'selection_cancel_pressed.png'
                        },
                    }
                });


                //Cleanup
                $scope.$on('destroy', function() {
                    viewer.destroy();
                });


            },

            // link: function(scope, element, attrs) {


            //     //Create options object
            //     var opts = angular.extend({}, scope.options, {
            //         id: "openseadragon-" + Math.random(),
            //         //element: element[0],
            //         element: $('div')[0],
            //         //toolbar: toolsDiv
            //     });

            //     if (attrs.tilesource) {
            //         opts.tileSources = [attrs.tilesource];
            //     }

            //     if (attrs.prefixUrl) {
            //         opts.prefixUrl = attrs.prefixUrl;
            //     }

            //     //Create the viewer
            //     scope.osd = OpenSeadragon(opts);

            //     //Create a wrapper
            //     var wrapper = {
            //         setFullScreen: function(fullScreen) {
            //             scope.osd.setFullScreen(fullScreen);
            //         },
            //         forceRedraw: function() {
            //             scope.osd.forceRedraw();
            //         },
            //         mouse: {
            //             position: null,
            //             imageCoord: null,
            //             viewportCoord: null,
            //         },
            //         zoom: 0,
            //         viewport: {
            //             bounds: null,
            //             center: null,
            //             rotation: 0,
            //             zoom: 0,
            //         }
            //     };

            //     //if @name is set, put the wrapper in the scope and handle the events
            //     var zoomHandler = null;
            //     var updateViewportHandler = null;

            //     if (attrs.name) {

            //         //Make the OSD available to parent scope
            //         scope.$parent[attrs.name] = wrapper;

            //         //Define event handlers
            //         zoomHandler = function(e) {
            //             scope.$apply(function() {
            //                 wrapper.zoom = e.zoom;
            //             });
            //         };

            //         updateViewportHandler = function(e) {
            //             scope.$apply(function() {
            //                 wrapper.viewport = {
            //                     bounds: scope.osd.viewport.getBounds(false),
            //                     center: scope.osd.viewport.getCenter(false),
            //                     rotation: scope.osd.viewport.getRotation(),
            //                     zoom: scope.osd.viewport.getZoom(false),
            //                 };
            //             });
            //         };

            //         //Assign event handlers
            //         scope.osd.addHandler("zoom", zoomHandler);
            //         scope.osd.addHandler("update-viewport", updateViewportHandler);

            //         //Add a mouse handler
            //         scope.mouse = new OpenSeadragon.MouseTracker({

            //             element: scope.osd.canvas,

            //             enterHandler: function(e) {
            //                 if (scope.osd.viewport) {
            //                     var coord = OpenSeadragon.getElementPosition(scope.osd.canvas);
            //                     var pos = e.position.plus(coord);
            //                     var mouse = {
            //                         position: pos,
            //                         imageCoord: scope.osd.viewport.windowToImageCoordinates(pos),
            //                         viewportCoord: scope.osd.viewport.windowToViewportCoordinates(pos),
            //                     };
            //                     scope.$apply(function() {
            //                         wrapper.mouse = mouse;
            //                     });
            //                 }
            //             },

            //             moveHandler: function(e) {
            //                 if (scope.osd.viewport) {
            //                     var coord = OpenSeadragon.getElementPosition(scope.osd.canvas);
            //                     var pos = e.position.plus(coord);
            //                     var mouse = {
            //                         position: pos,
            //                         imageCoord: scope.osd.viewport.windowToImageCoordinates(pos),
            //                         viewportCoord: scope.osd.viewport.windowToViewportCoordinates(pos),
            //                     };
            //                     scope.$apply(function() {
            //                         wrapper.mouse = mouse;
            //                     });
            //                 }
            //             },

            //             exitHandler: function(e) {
            //                 scope.$apply(function() {
            //                     wrapper.mouse.position = null;
            //                     wrapper.mouse.imageCoord = null;
            //                     wrapper.mouse.viewportCoord = null;
            //                 });
            //             },
            //         });

            //         scope.mouse.setTracking(true);
            //     }

            //     //When element is destroyed, destroy the viewer
            //     element.on('$destroy', function() {

            //         //if @nam eis set, remove it from parent scope, and remove event handlers
            //         if (attrs.name) {
            //             //Remove from parent scope
            //             scope.$parent[attrs.name] = null;

            //             //Destroy mouse handler
            //             scope.mouse.destroy();

            //             //Remove event handlers
            //             scope.osd.removeHandler("zoom", zoomHandler);
            //             scope.osd.removeHandler("update-viewport", updateViewportHandler);
            //         }

            //         //Destroy the viewer
            //         scope.osd.destroy();
            //     });
            // },
        };
    };

    return openseadragonDirective;

});
