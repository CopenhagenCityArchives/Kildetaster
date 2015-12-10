define([

    'angular'

], function(ang) {

    var stepOfDirective = /*@ngInject*/ function stepOfDirective() {

        return {

            restrict: 'E',

            scope: {
                current: '=',
                total: '='
            },

            templateUrl: 'shared/directives/stepOf.directive.tpl.html',
            
            link: function(scope, element, attrs) {

            }
        };
    };

    return stepOfDirective;

});