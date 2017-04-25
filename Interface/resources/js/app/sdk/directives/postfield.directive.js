define([

], function() {

    var postfieldDirective =  /*@ngInject*/ function() {

        return {
            restrict: 'E',

            templateUrl: 'sdk/directives/postfield.directive.tpl.html',

            scope: {
                data: '=',
                errorReporting: '=',
                showEmptyFields: '=',
                report: '&'
            },

            link: function(scope, element, attr) {

                scope.showErrorForm = false;

                scope.isArray = function(obj) {
                    return angular.isArray(obj);
                };

                scope.fieldVisibility = function fieldVisibility(fieldData) {

                    //We have a value
                    if (fieldData.value || fieldData.value === 0) {
                        return true
                    }

                    //We dont have a value but are to show empty fields
                    if (!fieldData.value && scope.showEmptyFields) {
                        return true;
                    }

                    return false;

                }

                scope.realValue = function(fieldData){
                    if(fieldData.value === 0)
                        return '0';

                    return fieldData.value;
                }

                scope.toggleErrorReporting = function(field) {
                    field.showErrorForm = !field.showErrorForm;
                };

                scope.doReport = function(group, field) {

                    var fieldData;

                    //Grab the entity_name from the fields parent (the group it belongs to)
                    field.entity_name = group.entity_name;

                    //console.log('group', group);
                    //console.log('field', field);

                    scope.report({
                        fieldData: field
                    });

                    field.showErrorsForm = false;

                };

            }
        };

    };

    return postfieldDirective;

});
