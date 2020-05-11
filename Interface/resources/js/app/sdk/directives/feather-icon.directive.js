
define([], function() {
    var featherIconDirective = /*@ngInject*/ function(RESOURCE_URL) {
        return {
            restrict: 'A',
            scope: {
                icon: '='
            },
            template: '<use xlink:href="{{getIconUrl()}}"/>',
            link: function(scope, element) {
                angular.element(element).addClass('feather');

                scope.getIconUrl = function() {
                    return RESOURCE_URL + 'images/feather-sprite.svg#' + scope.icon;
                }
            }
        }
    }

    return featherIconDirective;
});

