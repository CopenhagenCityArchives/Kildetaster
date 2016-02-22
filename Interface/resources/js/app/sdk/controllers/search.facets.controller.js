define([


], function() {

    var searchFacetController = /*@ngInject*/ function opentasksController($scope, $rootScope) {

        $scope.$on('facetsUpdated', function(event, data) {
            $scope.facetData = data;
        });

    };

    return searchFacetController;

});