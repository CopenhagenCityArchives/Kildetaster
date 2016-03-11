define([

], function() {

    var postfieldDirective =  /*@ngInject*/ function() {

        return {
            restrict: 'E',

            templateUrl: 'sdk/directives/postfield.directive.tpl.html',
            
            scope: {
                data: '=',
                errorReporting: '=',
                report: '&',
                toEditor: '&'
            },
            
            link: function(scope, element, attr) {

                scope.showErrorForm = false;

                scope.isArray = function(obj) {
                    return angular.isArray(obj);
                };

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

                scope.goToEditor = function(group) {

                    scope.toEditor({ 
                        field: group
                    });

                };

            }
        };

    };

    return postfieldDirective;

});