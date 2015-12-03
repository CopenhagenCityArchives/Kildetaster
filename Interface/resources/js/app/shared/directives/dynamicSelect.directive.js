define([

    'angular'

], function(ang) {

    var dynamicSelectDirective = function dynamicSelectDirective() {

        return {

            restrict: 'E',

            replace: true,

            scope: {
                field: '=fieldData'
            },

            templateUrl: 'shared/directives/dynamicSelect.directive.tpl.html',
            
            link: function(scope, element, attrs) {
                
            }
        };
    };

    return dynamicSelectDirective;

});