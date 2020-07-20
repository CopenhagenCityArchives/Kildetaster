define([

    'angular'

], function(ang) {

    var stepOfDirective = [function stepOfDirective() {

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
    }];

    return stepOfDirective;

});