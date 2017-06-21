define([


], function() {

    var facetDirective = function facetDirective() {

        return {
            restrict: 'E',

            templateUrl: 'sdk/directives/facet/facet.directive.tpl.html',

            scope: {
                data: '=',
                addFilter: '&',

            },

            link: function(scope, element, attr) {

                var defaultNumberOfItems = 5;

                scope.numberOfItems = defaultNumberOfItems;

                scope.showMore = function(fieldName) {
                    scope.numberOfItems = scope.numberOfItems + defaultNumberOfItems;
                };

                scope.toggleFilter = function toggleFilter(fieldName, facet) {
                    scope.addFilter()(fieldName, facet);
                };

                /**
                * Toggle visibility of selectable filter options
                */
                scope.toggle = function toggle() {
                    scope.data.active = !scope.data.active;
                }
            }
        }

    };

    return facetDirective;

});
