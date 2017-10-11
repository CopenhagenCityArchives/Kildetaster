define([


], function() {

    var directive = /*@ngInject*/ function(API, $state, helpers, searchService) {

        return {
            restrict: 'E',
            replace: true,

            scope: {
                data: "=",
                metadata: "="
            },

            templateUrl: 'sdk/directives/datapost-police.directive.tpl.html',

            link: function(scope, element, attr) {
                // Set up post information
                scope.getImageUrl = function() {
                    return "http://politietsregisterblade.dk/registerblade/"+ scope.metadata.station +"/" + scope.metadata.film + "/" + scope.metadata.file_front + ".jpg";
                }
            }
        };
    };

    return directive;
});