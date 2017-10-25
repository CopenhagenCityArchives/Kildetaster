define([


], function() {

    var directive = /*@ngInject*/ function(API, $state, helpers, solrService) {

        return {
            restrict: 'E',
            replace: true,

            scope: {
                data: "=",
                metadata: "="
            },

            templateUrl: 'sdk/directives/searchresult-burial.directive.tpl.html',

            link: function(scope, element, attr) {}
        };
    };

    return directive;
});