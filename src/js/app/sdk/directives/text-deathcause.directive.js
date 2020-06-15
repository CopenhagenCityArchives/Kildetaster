define([

], function() {

    var textnameDirective =  function() {

        return {
            restrict: 'E',

            template: require('./text-deathcause.directive.tpl.html'),

            scope: {
                deathcause: '='
            },

            link: function(scope, element, attr) {

            }
        };

    };

    return textnameDirective;

});
