define([

], function() {

    var facetsDirective = function facetsDirective(searchService) {

        return {
            restrict: 'E',

            templateUrl: 'sdk/directives/facets/facets.directive.tpl.html',

            scope: {
                data: '=',
                selectedFilters: '=',
                addFilter: '&'
            },

            link: function(scope, element, attr) {

                scope.toggleFilter = function toggleFilter(fieldName, facetName) {
                    scope.addFilter()(fieldName, facetName)
                }
            }
        }
    }

    return facetsDirective;

});
