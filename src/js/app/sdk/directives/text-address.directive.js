define([

], function() {

    var textnameDirective =  function() {

        return {
            restrict: 'E',

            template: require('./text-address.directive.tpl.html'),

            scope: {
                address: '='
            },

            link: function(scope, element, attr) {
                
            }
        };

    };

    return textnameDirective;

});
