define([

], function() {

    var textnameDirective =  /*@ngInject*/ function() {

        return {
            restrict: 'E',

            templateUrl: 'sdk/directives/text-age.directive.tpl.html',

            scope: {
                years: '=',
                month: '='
            },

            link: function(scope, element, attr) {
                //noop
            }
        };

    };

    return textnameDirective;

});
