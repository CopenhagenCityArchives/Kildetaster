define([

], function() {

    var textnameDirective =  /*@ngInject*/ function() {

        return {
            restrict: 'E',

            templateUrl: 'sdk/directives/text-age.directive.tpl.html',

            scope: {
                years: '=',
                months: '=',
                weeks: '=',
                days: '=',
                hours: '='
            },

            link: function(scope, element, attr) {

                //Convert the given string to a float
                scope.format = function(val) {
                    return parseFloat(val.replace(',', '.'));
                }

            }
        };

    };

    return textnameDirective;

});
