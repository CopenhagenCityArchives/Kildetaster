define([


], function() {

    var navigationController = /*@ngInject*/ function navigationController($scope, $state, $stateParams, resultData, searchService) {

        $scope.loading = false;

        $scope.prevPost = null;
        $scope.nextPost = null;

        $scope.numFound = resultData.numFound;
        $scope.number = resultData.number;

        $scope.disableNext = function() {
            return $stateParams.index >= $scope.numFound;
        };

        $scope.disablePrev = function() {
            return $stateParams.index === 1;
        };

        $scope.next = function() {

            if ($stateParams.index < $scope.numFound) {
                $state.go('.', { 
                    index: $stateParams.index + 1
                });
            }
        };

        $scope.prev = function() {
            $state.go('.', { 
                index: $stateParams.index - 1
            });
        };

    };

    return navigationController;

});