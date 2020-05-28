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

            template: require('./stepOf.directive.tpl.html'),
            
            link: function(scope, element, attrs) {

            }
        };
    };

    return stepOfDirective;

});