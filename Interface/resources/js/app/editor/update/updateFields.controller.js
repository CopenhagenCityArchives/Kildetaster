define([

], function() {

    var updateFieldsController = /*@ngInject*/ function updateFieldsController(Flash, $scope, $location, $timeout, taskData, pageData, postData, stepService, entryService) {

        //console.log('postDAta', postData);
        //console.log('taskDAta', taskData);

        $scope.values = postData.entryData;

        $scope.editingFields = {};

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
         * Toggle wether or not we should show edit field for a given field config
         */
        $scope.toggleEditExistingValue = function toggleEditExistingValue(item) {
            $scope.editingFields[item] = !$scope.editingFields[item];
        };

        /**
         * Ask if a given field is currently being edited
         */
        $scope.isEditing = function isEditing(field) {
            return $scope.editingFields[field];
        };      

        $scope.updateField = function updateField(field) {

            var fieldData = $scope.values[$scope.mainProperty][field];

            var id, value, entityName, fieldName;

            //console.log(fieldData);

            var path = field.split('.');


            if (angular.isArray(fieldData)) {
                //console.log('array');
                id = fieldData[0].id;
                entityName = field;
            }
            else if (path.length > 1) {
                //console.log('path');
                entityName = path[0];
                fieldName = path[1];
                id = $scope.values[$scope.mainProperty][entityName].id;
                value = $scope.values[$scope.mainProperty][entityName][fieldName];
            }
            else {
                //console.log('else');
                id = $scope.values[$scope.mainProperty].id;
                value = fieldData;
                entityName = $scope.mainProperty;
                fieldName = field;
            }

            var data = {  
                "entity_name": entityName,//"persons",
                "field_name" : fieldName,//"firstnames",
                "value": value, //"Niels",
                "concrete_entries_id": id, //178,
                "task_id": taskData.id
            };

            
            entryService.updateEntry(postData.entryId, data)
            .then(function(response) {
                Flash.create('success', 'Feltet er opdateret.');
                $scope.toggleEditExistingValue(field);
            }, function(err) {
                Flash.create('danger', 'Error updating entry' + err.data);
            });
            //window.location.href = 'http://www.kbharkiv.dk/deltag/kildetaster-test/kildetasteren-test';
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