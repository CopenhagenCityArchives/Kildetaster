var featherSprite = require('../../../../images/feather-sprite.svg');

var featherIconDirective = [function() {
    return {
        restrict: 'E',
        scope: {
            icon: '@'
        },
        template: '<svg aria-hidden="true" class="feather" xmlns="http://www.w3.org/2000/svg"></svg>',
        link: function(scope, element) {
            function setIcon() {
                var $svg = angular.element(element).find('svg');
                $svg.empty();
                var $symbol = angular.element(featherSprite).find('#' + scope.icon);
                $svg.attr('viewBox', $symbol.attr('viewBox'));
                $svg.append($symbol.children());
            }

            setIcon();

            scope.$watch('icon', function() {
                setIcon();
            })

        }
    }
}]

export default featherIconDirective;

