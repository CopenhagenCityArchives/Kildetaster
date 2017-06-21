define([


], function() {

    var navigationController = /*@ngInject*/ function navigationController($scope, $rootScope, $state, resultData, searchService) {

        $scope.loading = false;

        $scope.prevPost = null;
        $scope.nextPost = null;

        $scope.numFound = resultData.numFound;
        $scope.number = resultData.number;

        //Indicates if we initialized as part of a search query, if no numFound is set, assume that the page was hit directly
        $scope.partOfSearch = resultData.numFound !== undefined;

        $scope.disableNext = function() {
            return searchService.currentIndex >= $scope.numFound;
        };

        $scope.disablePrev = function() {
            return searchService.currentIndex === 0;
        };

        $scope.next = function() {

            searchService.currentIndex++;

            searchService.paginatedSearch(searchService.currentSearchConfig.query, searchService.currentSearchConfig.facets).then(function(response) {
                $state.go('.', {
                    postId: response.response.docs[0].post_id
                });
            });

        };

        $scope.prev = function() {

            searchService.currentIndex--;

            searchService.paginatedSearch(searchService.currentSearchConfig.query, searchService.currentSearchConfig.facets).then(function(response) {
                $state.go('.', {
                    postId: response.response.docs[0].post_id
                });
            });
        };

    };

    return navigationController;

});
