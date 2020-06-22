var featherSprite = require('../../../../images/feather-sprite.svg');

var featherIconDirective = [function() {
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

