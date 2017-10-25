define([


], function() {

    var navigationController = /*@ngInject*/ function navigationController($scope, $rootScope, $state, $stateParams, resultData, searchService, solrService) {

        $scope.loading = false;

        $scope.prevPost = null;
        $scope.nextPost = null;

        $scope.numFound = resultData.numFound;

        //Indicates if we initialized as part of a search query, if no numFound is set, assume that the page was hit directly
        $scope.partOfSearch = resultData.numFound !== undefined;

        $scope.currentIndex = $stateParams.index || 0;

        $scope.disableNext = function() {
            return $scope.currentIndex >= $scope.numFound - 1;
        };

        $scope.disablePrev = function() {
            return $scope.currentIndex === 0;
        };

        $scope.next = function() {
            $scope.currentIndex++;
            $state.go('.', {
                index: $scope.currentIndex
            });
        };

        $scope.prev = function() {
            $scope.currentIndex--;
            $state.go('.', {
                index: $scope.currentIndex
            });
        };

    };

    return navigationController;

});