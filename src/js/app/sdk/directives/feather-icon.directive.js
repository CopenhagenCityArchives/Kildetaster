var featherSprite = require('../../../../images/feather-sprite.svg');

var featherIconDirective = ['$sce', 'RESOURCE_URL', function($sce, RESOURCE_URL) {
    return {
        restrict: 'A',
        scope: {
            icon: '='
        },
        link: function(scope, element) {
            var $element = angular.element(element);
            $element.addClass('feather');
            var $symbol = angular.element(featherSprite).find('#' + scope.icon);
            $element.attr('viewBox', $symbol.attr('viewBox'));
            $element.append($symbol.children());
        }
    }
}]

export default featherIconDirective;

