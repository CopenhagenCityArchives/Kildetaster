define([

], function() {

    var updateFieldsController = /*@ngInject*/ function updateFieldsController($scope, updateData) {

        $scope.steps = updateData;

        //Toggle wether or not we should show edit field for a given field config
        $scope.toggleEditExistingValue = function toggleEditExistingValue(field) {
            field.isEditing = !field.isEditing;
        };


        $scope.fakeValidation = function fakeValidation(field) {
            field.isEditing = false;
            field.highlight = false;
        };

    };

    return updateFieldsController;

});