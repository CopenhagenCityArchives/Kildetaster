define([

], function() {

    var textnameDirective =  /*@ngInject*/ function() {

        return {
            restrict: 'E',

            template: require('./text-position.directive.tpl.html'),

            scope: {
                positions: '='
            },

            link: function(scope, element, attr) {

            }
        };

    };

    return textnameDirective;

});
