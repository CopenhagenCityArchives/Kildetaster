var updateFieldsController = ['$uibModal', '$rootScope', '$scope', '$state', '$timeout', 'PERMALINK_URL', 'taskData', 'userData', 'postData', 'stepService', 'entryService', 'errorService', 'helpers',
    function updateFieldsController($uibModal, $rootScope, $scope, $state, $timeout, PERMALINK_URL, taskData, userData, postData, stepService, entryService, errorService, helpers) {

    $scope.values = postData.entryData;

    //Get the postId, and store it on the values object, we need it to be able to save data
    $scope.values.post_id = postData.postId;

    $rootScope.$broadcast('zoom-to-post', { postId: postData.postId });

    //Build a direct link to this post
    $scope.shareLink = PERMALINK_URL + '/post/' + taskData.collection_id + '-' + postData.entryData.concrete_entries_id;

    $scope.errorReports = postData.errorReports;

    /**
    * Update a given error report
    * @params {int} id The error report id
    * @params {reason} string The reason for the update
    */
    $scope.updateErrorReport = function(report, reason) {
        reason = reason || "No reason given";

        report.deleted = 1;
        report.deleted_reason = reason;
    }

    /**
    * Delete a value from the value object
    * ie. the user does not think the saved value should be there at all
    */
    $scope.removeFieldValue = function removeFieldValue(field) {
        var split = field.key.split('.');
        if (split[0] === $scope.mainProperty) {
            split.shift();
        }

        if (split.length > 1) {
            $scope.values[$scope.mainProperty][split[0]][split[1]] = $scope.values[$scope.mainProperty][split[0]][split[1]].constructor === Array ? [] : null;
        }
        else {
            $scope.values[$scope.mainProperty][split[0]] = $scope.values[$scope.mainProperty][split[0]].constructor === Array ? [] : null;
        }

        $scope.toggleEdit(key, id);

    }

    /**
     * Put a value into the correct place in the given model.
     * 
     * @param {array} keySegments The parts of the key.
     * @param {object} model The value model for the schema.
     * @param {any} value The value to be inserted into the model.
     */
    function putValue(keySegments, model, value) {
        if (keySegments.length > 1) {
            let nextKey = angular.copy(keySegments)
            nextKey.shift()
            putValue(nextKey, model[keySegments[0]], value)
        } else if (keySegments.length == 1) {
            model[keySegments[0]] = value
        }
    }

    /**
     * Get a value from the correct place in the given model.
     * 
     * @param {array} keySegments The parts of the key.
     * @param {object} model The value model to put the value into.
     * @param {boolean} fullStructure Whether to return the full structure, eg. { keyPart1: { keyPart2: value } }
     */
    function getValue(keySegments, model, fullStructure) {
        if (keySegments.length > 1) {
            let nextKey = angular.copy(keySegments)
            nextKey.shift()
            if (fullStructure) {
                let struc = {}
                struc[keySegments[0]] = getValue(nextKey, model[keySegments[0]], fullStructure)
                return struc
            } else {
                return getValue(nextKey, model[keySegments[0]], fullStructure)
            }
        } else if (keySegments.length == 1) {
            if (fullStructure) {
                let struc = {}
                struc[keySegments[0]] = model[keySegments[0]]
                return struc
            } else {
                return model[keySegments[0]]
            }
        }
    }

    /**
    * Accept the edits made in a summary field.
    * 
    * Copy the temporary value when editing a field to the actual values object
    */
    $scope.acceptEdit = function acceptEdit(field) {
        let key = angular.isString(field.key) ? field.key.split('.') : field.key
        let value = getValue(key, field.editValue, false)
        putValue(key, $scope.values, value)
        $scope.toggleEdit(field);
    }

    $scope.userId = userData.apacs_user_id;

    //Default settings for angular-schema-forms
    $scope.sfDefaults = {
        formDefaults: {
            feedback: false,
            supressPropertyTitles: false,
            disableSuccessState: true,
            ngModelOptions: {},
            //Default value for array add action
            add: 'Tilføj'
        }
    };

    /**
     * When a schemaform is rendered, we set up event handlers to trigger submit on
     * enter key down, and we focus the form input element.
     */
    $scope.$on('sf-render-finished', function(event, schemaform) {
        $timeout(function() {
            // find relevant element -- input elements are handled natively
            let element = $(schemaform).find('.ui-select-focusser');
            if (element.length == 0) {
                element = $(schemaform).find('select');
            }

            // trigger submit on enter key down in order to use the event
            // handler set in the template
            if (element.length != 0) {
                element.on('keydown', function (event) { 
                    if (event.keyCode == 13) {
                        $(schemaform).trigger('submit');
                    }
                });
            }

            // set focus on relevant element - here we include input elements
            if (element.length == 0) {
                element = $(schemaform).find('input').first();
            }
            
            element.first().focus();
        });
    });

    /**
     * Toggle wether or not we should show edit field for a given field config
     */
    $scope.toggleEdit = function toggleEdit(field) {
        if (!field.isEditing) {
            // Toggle on: If the field is not being edited, set the edit status and copy the value from
            // the model with a deep copy into the temporary edit values.
            field.editValue = angular.copy(getValue(angular.isString(field.key) ? field.key.split('.') : field.key, $scope.values, true))
            field.isEditing = true;
        } else {
            // Toggle off: If the field is being edited, set is as not being edited, and delete the temporary 
            // edit value.
            field.editValue = null
            field.isEditing = false;
        }
    };

    /**
    * Build a string, representing the value of an array of fields
    * Will not take fields with null value / no value into account
    *
    * @param data {object}
    * @param prop {string}
    *
    * @return {string} The string represenation of all values, seperated by comma
    */
    $scope.getObjectStringRepresentation = function(data, schema) {
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
                    let subRepresentation = $scope.getObjectStringRepresentation(data[subpropKey], subprop.items)
                    if (subRepresentation) {
                        arr.push(subRepresentation)
                    }
                } else if (subprop.type == "array" && data[subpropKey]) {
                    for (let item of data[subpropKey]) {
                        let subRepresentation = $scope.getObjectStringRepresentation(item, subprop.items)
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
    };


    $scope.enableOverlayResize = function enableOverlayResize() {
        $rootScope.$broadcast('selectExistingOverlay', { postId: postData.postId })
    }

    /**
    * Update the post in the backend
    * When post is saved, update error report data on the backend in a seperate request
    */
    $scope.updatePost = function() {
        $scope.saving = true;

        //Update the post with new values
        entryService.updateEntry(postData.entryId, $scope.values)
            .then(function(response) {
                //Update error reports to indicate changes (deleted, fixed)
                if($scope.errorReports.length > 0){
                    return errorService.editErrorReports($scope.errorReports);
                }

                return;
            })
            .then(function(response) {

                //Go to the success state
                $state.go('.done');
            })
            .catch(function(err) {

                $scope.error = err;

                $uibModal.open({

                    template: require('../error.modal.tpl.html'),
                    //The type of modal. The error modal makes more room for the error text
                    windowClass: 'modal--error',

                    //Make wizard scope available to the modal
                    scope: $scope,

                    controller: ['$scope', function($scope) {
                        $scope.dismiss = function() {
                            $scope.$dismiss();
                        };
                    }]
                });
            })
            .finally(function() {
                $scope.saving = false;
            });
    };

    $scope.lookupFieldValue = function lookupFieldValue(field) {
        return helpers.lookupFieldValue(field.key, $scope.values);
    };

    /**
     * Load step data from the server
     */
    stepService.getData(taskData.id).then(function(response) {
        //The schema setup
        $scope.schema = response.schema;

        $scope.mainProperty = response.keyName;

        //Prepare data to render out fields in the correct order, ie. the order they are in the task step configuration
        $scope.summaryFields = helpers.prepareSummaryData(response.steps, response.schema, response.keyName);
    });
}];

export default updateFieldsController;