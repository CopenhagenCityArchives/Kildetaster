define([


], function() {

    var helpersService = /*@ngInject*/ function helpersService(API) {

        return {

            getImageUrlByPostId: function(postId) {
                return API + '/api/posts/' + postId + '/image';
            },

            /**
            * Convert openseadragon height and y coordinate to percentage
            */
            convertOpenSeadragonRectToPercent: function convertOpenSeadragonRectToPercent(rect, aspectRatio) {

                var converted = {
                    x: rect.x,
                    y: aspectRatio * rect.y,
                    width: rect.width,
                    height: aspectRatio * rect.height
                };

                return converted;
            },

            /**
            * Convert height and y coordinate in percentage to open seadragon format
            */
            convertPercentToOpenSeadragonRect: function convertPercentToOpenSeadragonRect(rect, aspectRatio) {
                var converted = {
                    x: rect.x,
                    y: ( 1 / aspectRatio ) * rect.y,
                    width: rect.width,
                    height: ( 1 / aspectRatio ) * rect.height
                };

                return converted;
            }

        };

    };

    return helpersService;

});
