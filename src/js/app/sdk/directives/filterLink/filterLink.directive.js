define([

], function() {

    var filterLinkDirective = function filterLinkDirective() {

        return {
            restrict: 'E',

            replace: true,

            template: require('./filterLink.tpl.html'),

            scope: {
                facet: '=',
                bucket: '=',
                removeFunc: '&'
            },

            link: function(scope, element, attr) {
                scope.remove = function() {
                    scope.removeFunc()(scope.facet, scope.bucket);
                };
            }

        }


    };

    return filterLinkDirective;

});
