define([

], function() {

    var textnameDirective =  /*@ngInject*/ function() {

        return {
            restrict: 'E',

            template: require('./text-name.directive.tpl.html'),

            scope: {
                firstnames: '=',
                lastname: '=',
                birthname: '='
            },

            link: function(scope, element, attr) {

            }
        };

    };

    return textnameDirective;

});
