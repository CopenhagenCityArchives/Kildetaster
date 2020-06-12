define([

], function() {

    var textnameDirective =  /*@ngInject*/ function() {

        return {
            restrict: 'E',

            template: require('./text-date.directive.tpl.html'),

            scope: {
                date: '=',
                prefix: '@prefix'
            },

            link: function(scope, element, attr) {

            }
        };

    };

    return textnameDirective;

});
