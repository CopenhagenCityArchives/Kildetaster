
define([], function() {
    var featherIconDirective = /*@ngInject*/ function(RESSOURCEURL) {
        return {
            restrict: 'A',
            scope: {
                icon: '='
            },
            template: '<use xlink:href="{{getIconUrl()}}"/>',
            link: function(scope, element) {
                angular.element(element).addClass('feather');

                scope.getIconUrl = function() {
                    return RESSOURCEURL + 'images/feather-sprite.svg#' + scope.icon;
                }
            }
        }
    }

    return featherIconDirective;
});

