
define([], function() {
    var featherIconDirective = /*@ngInject*/ function($sce, RESOURCE_URL) {
        return {
            restrict: 'A',
            scope: {
                icon: '='
            },
            template: '<use xlink:href="{{getIconUrl()}}"/>',
            link: function(scope, element) {
                angular.element(element).addClass('feather');

                scope.getIconUrl = function() {
                    return $sce.trustAsUrl(RESOURCE_URL + 'images/feather-sprite.svg#' + scope.icon);
                }
            }
        }
    }

    return featherIconDirective;
});

