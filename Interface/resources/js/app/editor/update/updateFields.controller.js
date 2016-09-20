define([

], function() {

    var updateFieldsController = /*@ngInject*/ function updateFieldsController(SEARCHURL, Flash, $scope, $location, $timeout, taskData, pageData, postData, stepService, entryService, $rootScope, $sessionStorage) {

        $scope.values = postData.entryData;

        $rootScope.$broadcast('zoom-to-post', { postId: postData.postId });

        $scope.arrayVal = {};

        $scope.editingFields = {};

        $scope.singleFieldForms = {};

        $scope.singleSchema = {};
        $scope.singleValue = {};

        //Build a direct link to this post
        $scope.shareLink = SEARCHURL + '#/post/' + postData.postId;

        $scope.errorReports = postData.errorReports;
//        $scope.errorReports = [];

        $scope.userId = $sessionStorage.tokenData.user_id;

        //Default settings for angular-schema-forms
        $scope.sfDefaults = {
            formDefaults: {
                feedback: false,
                supressPropertyTitles: true,
                disableSuccessState: true,
                ngModelOptions: {
                    updateOn: 'blur'
                }
            }
        };

        $scope.lookupErrorReport = function(key, mainProperty, subkey, id) {

            var toggleKey = key;

            if (mainProperty && subkey) {
                toggleKey = mainProperty + '.' + key + '.' + subkey;
            }

            if (id) {
                toggleKey = subkey;
            }

            var found = $scope.errorReports.find(function(error) {

                if (mainProperty && subkey) {
                    return error.entity_name === key && error.field_name === subkey;
                }
                else {
                    return error.field_name === key;
                }

            });

            if (found) {
                //$scope.toggleEditExistingValue(toggleKey, id);
            }

            return found;

        };

        /**
         * Toggle wether or not we should show edit field for a given field config
         */
        $scope.toggleEditExistingValue = function toggleEditExistingValue(value) {
            $scope.editingFields[value] = !$scope.editingFields[value];
        };

        /**
         * Ask if a given field is currently being edited
         */
        $scope.isEditing = function isEditing(field) {
            return $scope.editingFields[field];
        };


        /**
        * Build the value structure for single fields, that is fields that are part of an array structure
        */
        $scope.getValue = function (key, subkey, id) {

            var valueInValues = $scope.values[$scope.mainProperty][key]; //[0][subkey]);

            var data = valueInValues.find(function(item) {

                if (item.id === id) {
                    return item;
                }

            });

            $scope.singleValue = data;

        };


        /**
        * Build schema for single fields, that is fields that are part of an array structure
        */
        $scope.getSchema = function getSchema(key, subkey) {

            var data = {
                type: 'object',
                properties: {}
            };

            data.properties[subkey] = $scope.schema.properties[$scope.mainProperty].properties[key].items.properties[subkey];

            $scope.singleSchema = data;

        };

        $scope.updateField = function updateField(field, subkey) {

            var fieldData = $scope.values[$scope.mainProperty][field],
                id, value, entityName, fieldName,
                path = field.split('.');

            //Array structures
            if (angular.isArray(fieldData)) {
                entityName = field;
                fieldName = subkey;
                id = fieldData[0].id;
                value = $scope.singleValue[subkey];
            }
            //its a field with subfields
            else if (path.length > 1) {
                entityName = path[0];
                fieldName = path[1];
                id = $scope.values[$scope.mainProperty][entityName].id;
                value = $scope.values[$scope.mainProperty][entityName][fieldName];
            }
            //Regular field
            else {
                entityName = $scope.mainProperty;
                fieldName = field;
                id = $scope.values[$scope.mainProperty].id;
                value = fieldData;
            }

            var data = {
                "entity_name": entityName,
                "field_name" : fieldName,
                "concrete_entries_id": id,
                "value": value,
                "task_id": taskData.id
            };

            entryService.updateEntry(postData.entryId, data)
            .then(function(response) {

                Flash.create('success', 'Feltet er opdateret.');

                //Toggle the editing portion (hide iput field and button)
                $scope.toggleEditExistingValue(fieldName + id);

                //Remove the entry from the errorReports in the scope
                $scope.errorReports = $scope.errorReports.filter(function( report ) {
                    //Only return reports where the field_name does not match
                    //that way removing the error report for the field we are working on
                    return report['field_name'] !== fieldName;
                });

            }, function(err) {
                Flash.create('danger', 'Error updating entry' + err.data);

                //Toggle the editing portion (hide iput field and button)
                $scope.toggleEditExistingValue(fieldName + id);

                //Remove the entry from the errorReports in the scope
                $scope.errorReports = $scope.errorReports.filter(function( report ) {

                    //Only return reports where the field_name does not match
                    //that way removing the error report for the field we are working on
                    return report['field_name'] !== fieldName;
                });
            });

        };


        $scope.goToNextPostWithErrors = function goToNextPostWithErrors() {

        };

        /**
         * Load step data from the server
         */
        stepService.getData(taskData.id).then(function(response) {

            //The schema setup
            $scope.schema = response.schema;

            $scope.mainProperty = response.keyName;

        });

    };

    return updateFieldsController;

});
