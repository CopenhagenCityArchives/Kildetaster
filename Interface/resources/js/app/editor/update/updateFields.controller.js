define([

], function() {

    var updateFieldsController = /*@ngInject*/ function updateFieldsController(SEARCHURL, Flash, $scope, $location, $timeout, taskData, pageData, postData, stepService, entryService, $rootScope, $sessionStorage, errorService, $state) {

        $scope.values = postData.entryData;

        $rootScope.$broadcast('zoom-to-post', { postId: postData.postId });

        //Store information about what fields are currently being edited (open)
        $scope.editingFields = {};

        //Store array type schema form configurations TODO DELETE THIS
        $scope.schemas = {};


        $scope.valueCopy = {};

        //Build a direct link to this post
        $scope.shareLink = SEARCHURL + '#/post/' + postData.postId;

        $scope.errorReports = postData.errorReports;

        $scope.hasErrorReported = {};

        /**
        * Update a given error report
        * @params {int} id The error report id
        * @params {reason} string The reason for the update
        */
        $scope.updateErrorReport = function(id, reason) {

            reason = reason || "No reason given";

            var found = $scope.errorReports.find(function(report) {
                return report.id === id;
            });

            found.deleted = 1;
            found.deleted_reason = reason;

            $scope.hasErrorReported = $scope.parseErrorReports($scope.errorReports);
        }

        /**
        * Reject an error report
        * @params {int} id The error report id
        * @params {string} key The property name for the field in question
        * @params {int} keyId An optional id for the field. Is nessesary in some cases
        */
        $scope.rejectErrorReport = function rejectErrorReport(id, key, keyId) {
            $scope.updateErrorReport(id, "Error was rejected");
            $scope.toggleEditExistingValue(key, keyId);
        }

        /**
        * Delete a value from the value object
        * ie. the user does not think the saved value should be there at all
        */
        $scope.removeFieldValue = function removeFieldValue(key, id, reportId) {

            id = id || '';

            var split = key.split('.');

            if (split.length > 1) {
                $scope.values[$scope.mainProperty][split[0]][split[1]] = null;
            }
            else {
                $scope.values[$scope.mainProperty][key] = null;
            }

            if (reportId) {
                $scope.updateErrorReport(reportId, "Field value was deleted");
            }

            $scope.toggleEditExistingValue(key, id);
        }

        /**
        * Copy the tempoary value when editing a field to the actual values object
        */
        $scope.updateValues = function updateValues(key, id, reportId) {

            id = id || '';

            //If we have a key from an object type, it will contain a dot, to indicate the object and the property on that object
            var split = key.split('.');

            //The length will be more than one if we had a dot in the name
            if (split.length > 1) {
                $scope.values[$scope.mainProperty][split[0]][split[1]] = $scope.valueCopy[key][$scope.mainProperty][split[0]][split[1]];
            }
            //Otherwise just use the key (single and array type fields  )
            else {
                $scope.values[$scope.mainProperty][key] = $scope.valueCopy[key][$scope.mainProperty][key];
            }

            $scope.updateErrorReport(reportId, "Error was handled");

            $scope.toggleEditExistingValue(key, id);
        }

        $scope.noMoreErrorsForUser = false;
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

        $scope.getType = function(val) {

            function isObject(obj) {
                return obj === Object(obj);
            }

            if (val === null) {
                return null;
            } else if ($.isArray(val)) {
                return "array";
            }
            else if (isObject(val)) {
                return "object"
            }
            else {
                return typeof(val);
            }

        }

        /**
        * Look up error report in the list of all reports
        * TODO: Can be deleted?
        */
        $scope.lookupErrorReport = function(key, mainProperty, subkey, id) {

            var found = $scope.errorReports.find(function(error) {

                if (mainProperty && subkey) {
                    return error.entity_name === key && error.field_name === subkey && error.concrete_entries_id === id;
                }
                else {
                    return error.field_name === key && error.concrete_entries_id === id;
                }

            });

            return found;

        };

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

            console.log("qabe", $scope.valueCopy[value], $scope.values);

        };

        /**
         * Ask if a given field is currently being edited
         */
        $scope.isEditing = function isEditing(field) {
            return $scope.editingFields[field];
        };


        /**
        * Build schema for array type values
        //TODO DELETE THIS
        */
        $scope.getSchemaFromKey = function getSchemaFromKey(key) {

            var data = {
                type: 'object',
                properties: {}
            };

            data.properties[key] = $scope.schema.properties[$scope.mainProperty].properties[key];

            //Store schema setup as a property on schemas, so that we can have multiple array type fields
            //open at the same time. They each have a unique key
            $scope.schemas[key] = data;

        };

        $scope.getTextFromArray = function(data, prop) {
            //Lookup data for the given property
            var propData = $scope.schema.properties[$scope.mainProperty].properties[prop].items.properties,
            //array to hold the values of all subproperties
            arr = [];

            for (subprop in propData) {
                arr.push(data[subprop]);
            }

            //Join all values, seperate by comma
            return arr.join(', ');
        };

        // $scope.updateField = function updateField(field, subkey) {
        //
        //     return;
        //
        //     var fieldData = $scope.values[$scope.mainProperty][field],
        //         id, value, entityName, fieldName,
        //         path = field.split('.');
        //
        //     //Array structures
        //     if (angular.isArray(fieldData)) {
        //         entityName = field;
        //         fieldName = subkey;
        //         id = $scope.singleValue['id'];
        //         value = $scope.singleValue[subkey];
        //     }
        //     //its a field with subfields
        //     else if (path.length > 1) {
        //         entityName = path[0];
        //         fieldName = path[1];
        //         id = $scope.values[$scope.mainProperty][entityName].id;
        //         value = $scope.values[$scope.mainProperty][entityName][fieldName];
        //     }
        //     //Regular field
        //     else {
        //         entityName = $scope.mainProperty;
        //         fieldName = field;
        //         id = $scope.values[$scope.mainProperty].id;
        //         value = fieldData;
        //     }
        //
        //     var data = {
        //         "entity_name": entityName,
        //         "field_name" : fieldName,
        //         "concrete_entries_id": id,
        //         "value": value,
        //         "task_id": taskData.id
        //     };
        //
        //     entryService.updateEntry(postData.entryId, data)
        //     .then(function(response) {
        //
        //         Flash.create('success', 'Feltet er opdateret.');
        //
        //         //Toggle the editing portion (hide input field and button)
        //         $scope.toggleEditExistingValue(fieldName + id);
        //
        //         //Remove the entry from the errorReports in the scope
        //         $scope.errorReports = $scope.errorReports.filter(function( report ) {
        //             //Only return reports where the field_name does not match
        //             //that way removing the error report for the field we are working on
        //             return report['field_name'] !== fieldName;
        //         });
        //
        //         //That was the last error report on this post
        //         if ($scope.errorReports.length === 0) {
        //             $scope.lookupNextPostWithErrors();
        //         }
        //
        //     }, function(err) {
        //         Flash.create('danger', 'Error updating entry' + err.data);
        //
        //         //Toggle the editing portion (hide iput field and button)
        //         $scope.toggleEditExistingValue(fieldName + id);
        //
        //         //Remove the entry from the errorReports in the scope
        //         $scope.errorReports = $scope.errorReports.filter(function( report ) {
        //
        //             //Only return reports where the field_name does not match
        //             //that way removing the error report for the field we are working on
        //             return report['field_name'] !== fieldName;
        //         });
        //     });
        //
        // };

        $scope.nextErrorReport = null;
        $scope.hasMoreErrors = null;

        $scope.lookupNextPostWithErrors = function lookupNextPostWithErrors() {
            //Lookup all available error reports for the current user on this task
            errorService.getErrorReports({
                relevant_user_id: $scope.userId,
                task_id: taskData.id
            }).then(function(response) {
                //If we havent got any more errors
                if (response.length === 0) {
                    $scope.noMoreErrorsForUser = true;
                }
                else {
                    $scope.nextErrorReport = response[0];
                }

            });
        }

        $scope.$watch('nextErrorReport', function(newval) {
            if (newval && newval !== null) {
                $scope.hasMoreErrors = true;
            }
        });

        $scope.goToNextPostWithErrors = function goToNextPostWithErrors() {

            if ($scope.nextErrorReport !== null) {

                //Go to next post
                $state.go('editor.page.update', {
                    taskId: $scope.nextErrorReport.tasks_id,
                    pageId: $scope.nextErrorReport.pages_id,
                    postId: $scope.nextErrorReport.posts_id
                });
            }
        };


        /**
        * Update the post in the backend
        * When post is saved, update error report data on the backend in a seperate request
        */
        $scope.updatePost = function() {

            entryService.updateEntry(postData.entryId, $scope.values)
                .then(function(response) {
                    return errorService.editErrorReports($scope.errorReports);
                })
                .then(function(response) {
                    console.log(response);
                })
                .catch(function(err) {
                    console.log(err);
                })
        };

        $scope.parseErrorReports = function(reports) {

            var rtn = {};

            //Parse error report data, and build scope variable with info
            reports.forEach(function(report, index) {

                if (report.deleted === 1) {
                    return;
                }
                //TODO clean up when backend returns correct data
                if (index != 0) {
                    report.entity_position = "persons."+ report.entity_name;
                }
                else {
                    report.entity_position = report.entity_name;
                }

                var arr = [];
                arr.push(report);

                //non simple fields, like array and object type
                if ($scope.schema.properties[$scope.mainProperty].properties[report.entity_name] !== undefined) {

                    var type = $scope.schema.properties[$scope.mainProperty].properties[report.entity_name].type;

                    switch (type) {
                        case 'array':
                            rtn[report.entity_position] = arr;
                            break;
                        case 'object':
                            rtn[report.entity_position + '.' + report.field_name] = arr;
                            break;
                    }
                }
                else {
                    rtn[report.entity_position + '.' + report.field_name] = report;
                }

            });

            return rtn;
        }

        /**
         * Load step data from the server
         */
        stepService.getData(taskData.id).then(function(response) {

            //The schema setup
            $scope.schema = response.schema;

            $scope.mainProperty = response.keyName;


            $scope.hasErrorReported = $scope.parseErrorReports($scope.errorReports);

        });

    };

    return updateFieldsController;

});
