define([


], function() {

    var helpersService = ['API_URL', function helpersService(API_URL) {

        return {

            getImageUrlByPostId: function(postId) {
                return API_URL + '/posts/' + postId + '/image';
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
                let split = !angular.isArray(key) ? key.split('.') : key

                let value = split.reduce(function(accumulator, currentValue) {
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
            prepareSummaryData: function prepareSummaryData(steps, schema) {
                let summaryData = [];

                for (let step of angular.copy(steps)) {
                    if (!step.fields) {
                        continue;
                    }

                    for (let field of step.fields) {
                        let fieldSchema = schema;
                        for (let keySegment of field.key.split('.')) {
                            fieldSchema = fieldSchema.properties[keySegment];
                        }
                        
                        field.schema = fieldSchema;
                        field.isEditing = false;

                        //The last key part
                        let key = field.key.split('.');
                        field.realKey = key[key.length - 1];
                        field.toggleKey = field.key.replace(/\./g, '-');

                        field.key.split = function(delim) {
                            this.toString().split(delim)
                        }

                        summaryData.push(field);
                    }
                }

                return summaryData;
            },

            /**
            * Build a string, representing the value of an array of fields
            * Will not take fields with null value / no value into account
            *
            * @param data {object}
            * @param prop {string}
            *
            * @return {string} The string represenation of all values, seperated by comma
            */
            getObjectStringRepresentation: function(data, schema) {
                //array to hold the values of all subproperties
                var arr = [];

                for (var subpropKey in schema.properties) {
                    //If we have a value for the property, add it to the array
                    //If a given field was not filled, it will exist, but have a null value. In that case, it should not be used
                    //to build the string
                    //For boolean values, we still want to see false values
                    let subprop = schema.properties[subpropKey]
                    if (data[subpropKey] || (subprop.type == "boolean" && data[subpropKey] === false)) {
                        if (subprop.type == "boolean") {
                            // for boolean values, we also write the field name
                            arr.push(subprop.formName + " (" + (data[subpropKey] ? 'Ja' : 'Nej') + ")")
                        } else if (subprop.type == "object") {
                            let subRepresentation = this.getObjectStringRepresentation(data[subpropKey], subprop.items)
                            if (subRepresentation) {
                                arr.push(subRepresentation)
                            }
                        } else if (subprop.type == "array" && data[subpropKey]) {
                            for (let item of data[subpropKey]) {
                                let subRepresentation = this.getObjectStringRepresentation(item, subprop.items)
                                if (subRepresentation) {
                                    arr.push(subRepresentation)
                                }
                            }
                        } else {
                            arr.push(data[subpropKey]);
                        }
                    } 
                }

                //Join all values, seperate by comma
                return arr.join(', ');
            }
        };
    }];

    return helpersService;

});
