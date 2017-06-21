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

                scope.numberOfItems = 10;

                scope.showMore = function(fieldName) {
                    scope.numberOfItems = scope.numberOfItems + 10;
                };

                scope.toggleFilter = function toggleFilter(fieldName, facetName) {
                    scope.addFilter()(fieldName, facetName)
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
