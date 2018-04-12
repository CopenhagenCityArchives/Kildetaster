define([

], function() {

    var textnameDirective =  /*@ngInject*/ function() {

        return {
            restrict: 'E',

            templateUrl: 'sdk/directives/text-position.directive.tpl.html',

            scope: {
                positions: '='
            },

            link: function(scope, element, attr) {

            }
        };

    };

    return textnameDirective;

});
