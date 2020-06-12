define([


], function() {

    var searchFacetController = /*@ngInject*/ function opentasksController($scope, $rootScope) {

        $scope.selectedFacets = {};

        $scope.toggleFacet = function(facet) {
            if ($scope.selectedFacets[facet.field + facet.data]) {
                $scope.selectedFacets[facet.field + facet.data] = undefined;
            }
            else {
                $scope.selectedFacets[facet.field + facet.data] = facet;
            }
            
        };

        $scope.$on('facetsUpdated', function(event, data) {
            $scope.facetData = data;
        });

        $scope.filterSearch = function(field) {

            $scope.toggleFacet(field);

            $rootScope.$broadcast('filterSearch', $scope.selectedFacets);
        };

    };

    return searchFacetController;

});