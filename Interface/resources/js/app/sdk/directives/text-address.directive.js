define([

], function() {

    var textnameDirective =  /*@ngInject*/ function() {

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
