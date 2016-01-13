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
    var openseadragonDirective = /*@ngInject*/ function openseadragonDirective($timeout) {

        return {

            restrict: "E",

            scope: {
                options: '=',
                editArea: '='
            },

            controller: /*@ngInject*/ function($scope, $compile, $templateCache, $element, $rootScope) {

                var viewer, opts, selectionOverlay, selection, tracker;

                //Openhttps://github.com/openseadragon/openseadragon/issues/759

                //Prepare the template
                var template = $compile($templateCache.get('shared/directives/imageViewer.directive.tpl.html'))($scope);

                //Add template to the dom
                angular.element($element).replaceWith(template);

                /**
                 * Helper function to add a specific css class to each overlay
                 */
                function addClassToOverlay(overlayData) {

                    if (!angular.isArray(overlayData)) {
                        return [];
                    }
                    return overlayData.map(function(data) {
                        data.className = 'imageViewer__done';
                        return data;
                    });
                }

                //Add class all given overlays to render them as existing
                $scope.options.tileSources.overlays = addClassToOverlay($scope.options.tileSources.overlays);

                opts = angular.extend({}, {

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

                    maxZoomPixelRatio: 4,

                    gestureSettingsMouse: {
                        scrollToZoom: true,
                        clickToZoom: true,
                        pinchToZoom: false

                    },

                    gestureSettingsTouch: {
                        scrollToZoom: true,
                        clickToZoom: true,
                        pinchToZoom: false
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
                viewer = OpenSeadragon(opts);

                viewer.addHandler('add-overlay', function(overlay) {

                    if (overlay.element) {
                        selectionOverlay = overlay;
                    }

                });

                //Event fired when selection is confirmed
                viewer.addHandler('selection', function(data) {
                    $rootScope.$broadcast('areaSelected');
                });

                $scope.$on('areaAccepted', function() {
                    selection.confirm();
                });

                $scope.$on('makeSelectable', function() {
                    
                    viewer.removeOverlay(selectionOverlay.element);

                    var x = selectionOverlay.location.x;
                    var y = selectionOverlay.location.y;
                    var height = selectionOverlay.location.height;
                    var width = selectionOverlay.location.width;

                    var selectionRect = new OpenSeadragon.SelectionRect(x, y, width, height);

                    selection.rect = selectionRect;
                    selection.draw();

                    viewer.viewport.fitVertically(true);

                    //Setup custom key tracker for moving/resizing the selection
                    createKeyTracker();

                    viewer.canvas.focus();

                });

                //If set to a rect object, will show a selection on initilization of the selection plugin
                var rect = null;

                //Area we supposed to show an overlay with an area being edited?
                if ($scope.editArea) {

                    //TODO: fitBounds on event instead of a custom timeout
                    $timeout(function() {

                        var editAreaOverlay = new OpenSeadragon.Rect($scope.editArea.x, $scope.editArea.y, $scope.editArea.width, $scope.editArea.height);

                        viewer.addOverlay({
                            element: $('<div class="imageViewer__progress"></div>')[0],
                            location: editAreaOverlay
                        });

                        viewer.viewport.fitBounds(editAreaOverlay, true);

                    }, 1000);

                }
                //Else prepare a new rect object with initial selection
                else {
                    rect = new OpenSeadragon.SelectionRect(0.25, 0.6, 0.42, 0.45);

                    //When the directive is initialized, make sure we listen for key events on the selection area
                    createKeyTracker();
                    
                }

                //Selection plugin
                //https://github.com/picturae/openseadragonselection
                selection = viewer.selection({

                    onSelection: function(rect) {

                        //https://github.com/picturae/openseadragonselection/issues/7
                        var converted = viewer.viewport.imageToViewportRectangle(rect);

                        viewer.addOverlay({
                            element: $('<div class="imageViewer__progress"></div>')[0],
                            location: converted,
                        });

                        //Zoom viewer to the selected area
                        viewer.viewport.fitBounds(converted, true);
                        
                        //Remove the custom key event handler
                        removeKeyTracker();

                    },
                    //Initial selection if rect is set
                    rect: rect,

                    toggleButton: 'toggle-selection',

                    //Should we show the confirm/cancel buttons in the selection area?
                    showConfirmDenyButtons: false,

                    //Center buttons?
                    styleConfirmDenyButtons: true,

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

                    //Store default keyhandler, so that we can reenable it
                var tmp = viewer.innerTracker.keyDownHandler,
                    //Array of pressed keys, indexed on keyCode
                    map = [];

                /**
                * Create a custom tracker for key events, to control moving and resizing the selection area with 
                * the keyboard
                */
                function createKeyTracker() {

                    // Based on http://stackoverflow.com/questions/5203407/javascript-multiple-keys-pressed-at-once
                    tracker = new OpenSeadragon.MouseTracker({

                        element: viewer.canvas,

                        keyUpHandler: function(event) {
                            //When a key is released, set its keyCode to false
                            map[event.keyCode] = false;
                        },

                        keyDownHandler: function(event) {
                            
                            //When key is pressed, set its keycode to true in the array
                            map[event.keyCode] = true;
                                                        
                            //q is not pressed
                            if (!map[81]) {
                                //Restore the saved default keyhandler
                                viewer.innerTracker.keyDownHandler = tmp;
                            }
                            //q is pressed
                            if (map[81]) {
                                //remove default key handler
                                viewer.innerTracker.keyDownHandler = null;
                            }

                            //Enter key
                            if (map[13]) {
                                selection.confirm();
                            }

                            //shift
                            if (map[16]) {
                                //left
                                if (map[81] && map[37]) {
                                    selection.rect.width = selection.rect.width -= 0.005;
                                    selection.draw();
                                }
                                //right
                                if (map[81] && map[39]) {
                                    selection.rect.width = selection.rect.width += 0.005;
                                    selection.draw();
                                }
                                //up
                                if (map[81] && map[38]) {
                                    selection.rect.height = selection.rect.height -= 0.005;
                                    selection.draw();
                                }
                                //down
                                if (map[81] && map[40]) {
                                    selection.rect.height = selection.rect.height += 0.005;
                                    selection.draw();
                                }

                            } else {
                                //left
                                if (map[81] && map[37]) {
                                    selection.rect.x = selection.rect.x -= 0.005;
                                    selection.draw();
                                }
                                //right
                                if (map[81] && map[39]) {
                                    selection.rect.x = selection.rect.x += 0.005;
                                    selection.draw();
                                }
                                //up
                                if (map[81] && map[38]) {
                                    selection.rect.y = selection.rect.y -= 0.005;
                                    selection.draw();
                                }
                                //down
                                if (map[81] && map[40]) {
                                    selection.rect.y = selection.rect.y += 0.005;
                                    selection.draw();
                                }
                            }

                        }
                    });

                }

                /**
                * Remove the custom key tracker and cleanup
                */
                function removeKeyTracker () {
                    if (tracker instanceof OpenSeadragon.MouseTracker) {
                        tracker.destroy();
                    }
                    map = [];
                }

                //Cleanup
                $scope.$on('destroy', function() {
                    tracker.destroy();
                    viewer.destroy();
                });
            }
        };
    };

    return openseadragonDirective;

});
