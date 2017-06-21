define([

], function() {

    var filterLinkDirective = function filterLinkDirective() {

        return {
            restrict: 'E',

            replace: true,

            templateUrl: 'sdk/directives/filterLink/filterLink.tpl.html',

            scope: {
                name: '=',
                data: '=',
                removeFunc: '&'
            },

            link: function(scope, element, attr) {
                scope.remove = function() {
                    scope.removeFunc()(scope.data.fieldName, scope.data);
                };
            }

        }


    };

    return filterLinkDirective;

});
