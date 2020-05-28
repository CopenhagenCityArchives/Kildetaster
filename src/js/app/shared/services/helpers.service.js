define([


], function() {

    var helpersService = /*@ngInject*/ function helpersService(API) {

        return {

            getImageUrlByPostId: function(postId) {
                return API + '/posts/' + postId + '/image';
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
            },

            uniqueBy: function uniqueBy(arr, fn) {
                var unique = {};
                var distinct = [];
                arr.forEach(function(x) {
                    var key = fn(x);
                    if (!unique[key] && key !== null) {
                        distinct.push(key);
                        unique[key] = true;
                    }
                });
                return distinct;
            },

            /**
            * Lookup the value of a specifik object path in the $scope.values object
            *
            * @param key {string|array} The path to the value
            *
            * @return The value found, or an empty string if none were found
            */
            lookupFieldValue: function lookupFieldValue(key, values) {

                if (!angular.isArray(key)) {
                    key = key.split('.');
                }

                var value = key.reduce(function(accumulator, currentValue) {
                    //Only continue if we have a value
                    if (accumulator[currentValue] || accumulator[currentValue] === 0) {
                        return accumulator[currentValue];
                    }
                    return '';

                }, values);

                return value;

            },

            /**
            * Parse stepData, and return the needed data to render a Summary
            */
            prepareSummaryData: function prepareSummaryData(stepData, schema, mainProperty) {

                var arr = [],
                    stepCopy = angular.copy(stepData);

                //Build array for the summary rendering, working on a copy
                stepCopy.forEach(function(stepData) {

                    if (stepData.fields && stepData.fields.length > 0) {

                        var stepFields = stepData.fields.forEach(function(field) {

                            var key = field.key.split('.');

                            field.schema = schema.properties[mainProperty].properties[key[1]];

                            //The last key part
                            field.realKey = key[key.length - 1];
                            field.toggleKey = field.key.replace(/\./g, '-');

                            arr.push(field);

                        });
                    }

                });

                return arr;
            }

        };

    };

    return helpersService;

});
