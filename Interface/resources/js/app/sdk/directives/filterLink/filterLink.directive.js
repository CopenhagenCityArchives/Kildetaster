define([

], function() {

    var filterLinkDirective = function filterLinkDirective() {

        return {
            restrict: 'E',

            templateUrl: 'sdk/directives/filterLink/filterLink.tpl.html',

            scope: {
                name: '=',
                url: '='
            },

            link: function(scope, element, attr) {
                
            }

        }


    };

    return filterLinkDirective;

});
