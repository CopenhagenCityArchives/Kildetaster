define([
], function() {

    var searchDirective = /*@ngInject*/ function() {

        return {
            
            restrict: 'E',
            replace: true,

            scope: {
                result: '='
            },

            templateUrl: 'sdk/directives/searchresult.directive.tpl.html',

            link: function(scope, element, attr) {

            }
        };

    };

    return searchDirective;

});