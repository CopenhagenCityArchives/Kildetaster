define([

], function() {

    var updateFieldsController = /*@ngInject*/ function updateFieldsController(SEARCHURL, Flash, $scope, $location, $timeout, taskData, pageData, postData, stepService, entryService, $rootScope, $sessionStorage, errorService, $state) {

        $scope.values = postData.entryData;

        $rootScope.$broadcast('zoom-to-post', { postId: postData.postId });

        //Store information about what fields are currently being edited (open)
        $scope.editingFields = {};

        //A store for copies of the values. used to let users change the field as they want, but only after they accept the change do we copy it to the actual data
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

            if (found) {
                found.deleted = 1;
                found.deleted_reason = reason;
            }

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
                    $state.go('.done');
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
