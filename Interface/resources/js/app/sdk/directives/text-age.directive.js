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

                console.log(scope);

                //alle kan have decimaler
                scope.days = scope.days;
                scope.daysText = scope.days === '1,00' ? 'dag' : 'dage';

                scope.weeks = scope.weeks;

                scope.hours = scope.hours;

            }
        };

    };

    return textnameDirective;

});
