define([

    'angular',

], function(ang) {

    var dynamicInputDirective = /*@ngInject*/ function dynamicInputDirective($rootScope) {

        return {

            restrict: 'E',

            replace: true,

            scope: {
                field: '=fieldData',
                autofocus: '='
            },

            templateUrl: 'shared/directives/dynamicInput.directive.tpl.html',
            
            link: function(scope, element, attrs) {

                //Make rootScope TEXT constant available in local scope
                scope.TEXT = $rootScope.TEXT;

                scope.toggleUnreadable = function toggleUnreadable() {

                    var prop = scope.field.unreadable;

                    scope.field.unreadable = prop ? false : true;
                };

                //If we are supposed to set autofocus to the field
                if (scope.autofocus) {
                    //Do so
                    $(element[0]).find('input').focus();
                }

                //Listen for changes to autofocus property
                scope.$watch('autofocus', function(newVal, oldVal) {
                    if (newVal !== oldVal && newVal === true) {
                        $(element[0]).find('input').focus();
                    }
                });
            }
        };
    };

    return dynamicInputDirective;

});