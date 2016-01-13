define([

], function() {

    var updateFieldsController = /*@ngInject*/ function updateFieldsController($scope, updateData, $location, $timeout) {

        $scope.steps = updateData;

        //Toggle wether or not we should show edit field for a given field config
        $scope.toggleEditExistingValue = function toggleEditExistingValue(field) {
            field.isEditing = !field.isEditing;
        };

        /* Watch the step data, and see if any of the fields is currently open/highlighted*/
        $scope.$watch('steps', function(steps) {
            
            var fieldIsOpen = false;

            angular.forEach(steps, function(step) {
                if (fieldIsOpen === false) {
                    angular.forEach(step.fields, function(field) {
                        if (field.isEditing == true || field.highlight == true) {
                            fieldIsOpen = field.isEditing || field.highlight;
                        }
                        
                    });
                }                
            });

            //If something is open/editied, do not show save option
            $scope.readyToSave = !fieldIsOpen;

        }, true);

        $scope.readyToSave = false;

        $scope.fakeValidation = function fakeValidation(field) {
            field.isEditing = false;
            field.highlight = false;
        };

        $scope.save = function save() {
            window.location.href = 'http://www.kbharkiv.dk/deltag/kildetaster-test/kildetasteren-test';
        };

        $timeout(function() {
            $('.editor-form-container a:first').focus();
        });
        

    };

    return updateFieldsController;

});