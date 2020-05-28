define([

    'angular'

], function(ang) {

    var stepIndicatorDirective = /*@ngInject*/ function stepIndicatorDirective($location) {

        return {

            restrict: 'E',
            replace: true,

            scope: {
                current: '=',
                total: '=',
                goToStep: '=',
                disabled: '='
            },

            template: require('./stepIndicator.directive.tpl.html'),
            
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

                scope.go = function go(index) {
                    if (!scope.disabled) {
                        scope.goToStep(index);
                    }
                };
                
            }
        };
    };

    return stepIndicatorDirective;

});