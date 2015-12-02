define([

    'angular'

], function(ang) {

    var stepIndicatorDirective = function stepIndicatorDirective() {

        return {

            restrict: 'E',

            scope: {
                current: '=',
                total: '='
            },

            templateUrl: 'shared/directives/stepIndicator.directive.tpl.html',
            
            link: function(scope, element, attrs) {

                scope.steps = function(total) {
                    return new Array(total);
                };

                scope.isCurrent = function(index) {
                    return (index + 1) === scope.current;
                };

                scope.hasPrevious = function(index) {
                    return index < scope.current;
                };


            }
        };
    };

    return stepIndicatorDirective;

});