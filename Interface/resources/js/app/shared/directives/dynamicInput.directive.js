define([

    'angular'

], function(ang) {

    var dynamicInputDirective = function dynamicInputDirective($rootScope) {

        return {

            restrict: 'E',

            replace: true,

            scope: {
                field: '=fieldData'
            },

            templateUrl: 'shared/directives/dynamicInput.directive.tpl.html',
            
            link: function(scope, element, attrs) {

                //Make rootScope TEXT constant available in local scope
                scope.TEXT = $rootScope.TEXT;

                scope.toggleUnreadable = function toggleUnreadable() {

                    var prop = scope.field.unreadable;

                    scope.field.unreadable = prop ? false : true;
                };

            }
        };
    };

    return dynamicInputDirective;

});