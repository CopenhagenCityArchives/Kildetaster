var featherSprite = require('../../../../images/feather-sprite.svg');

var featherIconDirective = [function() {
    return {
        restrict: 'E',
        scope: {
            icon: '@'
        },
        link: function(scope, element) {
            var $element = angular.element('<svg xmlns="http://www.w3.org/2000/svg">');

            $element.addClass('feather');
            $element.addClass(angular.element(element).attr('class'));
            var $symbol = angular.element(featherSprite).find('#' + scope.icon);
            $element.attr('viewBox', $symbol.attr('viewBox'));
            $element.append($symbol.children());

            angular.element(element).replaceWith($element);
        }
    }
}]

export default featherIconDirective;

