var updateFieldsController = ['$uibModal', '$rootScope', '$scope', '$state', '$timeout', 'PERMALINK_URL', 'taskData', 'userData', 'postData', 'stepService', 'entryService', 'errorService', 'helpers',
    function updateFieldsController($uibModal, $rootScope, $scope, $state, $timeout, PERMALINK_URL, taskData, userData, postData, stepService, entryService, errorService, helpers) {

    $scope.values = postData.entryData;

    //Get the postId, and store it on the values object, we need it to be able to save data
    $scope.values.post_id = postData.postId;

    $rootScope.$broadcast('zoom-to-post', { postId: postData.postId });

    //Store information about what fields are currently being edited (open)
    $scope.editingFields = {};

    //A store for copies of the values. used to let users change the field as they want, but only after they accept the change do we copy it to the actual data
    $scope.valueCopy = {};

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
    $scope.removeFieldValue = function removeFieldValue(key, id) {
        id = id || '';

        var split = key.split('.');
        if (split[0] === $scope.mainProperty) {
            split.shift();
        }

        if (split.length > 1) {
            $scope.values[$scope.mainProperty][split[0]][split[1]] = $scope.values[$scope.mainProperty][split[0]][split[1]].constructor === Array ? [] : null;
        }
        else {
            $scope.values[$scope.mainProperty][split[0]] = $scope.values[$scope.mainProperty][split[0]].constructor === Array ? [] : null;
        }

        $scope.toggleEditExistingValue(key, id);
    }

    /**
    * Copy the temporary value when editing a field to the actual values object
    */
    $scope.updateValues = function updateValues(key, id) {
        id = id || '';

        //If we have a key from an object type, it will contain a dot, to indicate the object and the property on that object
        var split = key.split('.');
        var subkey;

        if (split[0] === $scope.mainProperty) {
            split.shift();
            subkey = split.join('.');
        }

        //The length will be more than one if we had a dot in the name
        if (split.length > 1) {
            //If the secondary element is not set set it
            if(!$scope.values[$scope.mainProperty][split[0]]){
                $scope.values[$scope.mainProperty][split[0]] = {};
            }

            $scope.values[$scope.mainProperty][split[0]][split[1]] = $scope.valueCopy[$scope.mainProperty + '.' + subkey][$scope.mainProperty][split[0]][split[1]];

        }
        //Otherwise just use the key (single and array type fields  )
        else {
            $scope.values[$scope.mainProperty][subkey] = $scope.valueCopy[key][$scope.mainProperty][subkey];
        }

        $scope.toggleEditExistingValue(key, id);
    }

    $scope.userId = userData.apacs_user_id;

    //Default settings for angular-schema-forms
    $scope.sfDefaults = {
        formDefaults: {
            feedback: false,
            supressPropertyTitles: true,
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
    $scope.toggleEditExistingValue = function toggleEditExistingValue(value, id) {

        id = id || '';

        if ($scope.editingFields[value + id] === undefined || $scope.editingFields[value + id] === false ) {
            $scope.valueCopy[value] = $.extend(true, {}, $scope.values);
            $scope.editingFields[value + id] = true;
        }
        else {
            delete $scope.valueCopy[value + id];
            $scope.editingFields[value + id] = false;
            //cleanup
        }

    };

    /**
     * Ask if a given field is currently being edited
     */
    $scope.isEditing = function isEditing(field) {
        return $scope.editingFields[field];
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
    $scope.getTextFromArrayField = function(data, prop) {
        //array to hold the values of all subproperties
        var arr = [];

        for (var subprop in prop) {
            //If we have a value for the property, add it to the array
            //If a given field was not filled, it will exist, but have a null value. In that case, it should not be used
            //to build the string
            if (data[subprop]) {
                arr.push(data[subprop]);
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

    $scope.lookupFieldValue = function lookupFieldValue(key) {
        return helpers.lookupFieldValue(key, $scope.values);
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