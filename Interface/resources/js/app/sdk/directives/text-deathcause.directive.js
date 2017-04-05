define([

], function() {

    var textnameDirective =  /*@ngInject*/ function() {

        return {
            restrict: 'E',

            templateUrl: 'sdk/directives/text-deathcause.directive.tpl.html',

            scope: {
                deathcause: '='
            },

            link: function(scope, element, attr) {

            }
        };

    };

    return textnameDirective;

});
