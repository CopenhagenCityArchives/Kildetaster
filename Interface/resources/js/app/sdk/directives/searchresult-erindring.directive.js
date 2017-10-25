define([


], function() {

    var directive = /*@ngInject*/ function(API, $state, helpers, solrService) {

        return {
            restrict: 'E',
            replace: true,

            scope: {
                data: "=",
                metadata: "=",
                highlighting: "="
            },

            templateUrl: 'sdk/directives/searchresult-erindring.directive.tpl.html',

            link: function(scope, element, attr) {}
        };
    };

    return directive;
});