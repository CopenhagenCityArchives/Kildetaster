define([

], function() {

    var textnameDirective =  /*@ngInject*/ function() {

        return {
            restrict: 'E',

            templateUrl: 'sdk/directives/text-address.directive.tpl.html',

            scope: {
                address: '='
            },

            link: function(scope, element, attr) {
                
            }
        };

    };

    return textnameDirective;

});
