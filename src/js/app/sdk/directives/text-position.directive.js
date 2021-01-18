define([

], function() {

    var textnameDirective =  function() {

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
