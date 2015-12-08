define([

    'angular'

], function(ang) {

    var dynamicSelectDirective = function dynamicSelectDirective($rootScope) {

        return {

            restrict: 'E',

            replace: true,

            scope: {
                field: '=fieldData',
                autofocus: '='
            },

            templateUrl: 'shared/directives/dynamicSelect.directive.tpl.html',
            
            link: function(scope, element, attrs) {
                //Make TEXT available in local scope
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
                
            }
        };
    };

    return dynamicSelectDirective;

});