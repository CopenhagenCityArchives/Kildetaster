define([

], function() {

    var textnameDirective =  /*@ngInject*/ function() {

        return {
            restrict: 'E',

            templateUrl: 'sdk/directives/text-name.directive.tpl.html',

            scope: {
                firstnames: '=',
                lastname: '=',
                birthname: '='
            },

            link: function(scope, element, attr) {

            }
        };

    };

    return textnameDirective;

});
