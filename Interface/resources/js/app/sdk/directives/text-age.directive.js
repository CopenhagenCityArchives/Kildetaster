define([

], function() {

    var textnameDirective =  /*@ngInject*/ function() {

        return {
            restrict: 'E',

            templateUrl: 'sdk/directives/text-age.directive.tpl.html',

            scope: {
                prefix: '=',
                years: '=',
                months: '=',
                weeks: '=',
                days: '=',
                hours: '='
            },

            link: function(scope, element, attr) {

                //Convert the given string to a float
                scope.format = function(val) {
                    val = '' + val || '';
                    return parseFloat(val.replace(',', '.'));
                }

            }
        };

    };

    return textnameDirective;

});
