define([

], function() {

    var editorController = /*@ngInject*/ function editorController($scope, $state, taskData, userService, $interval, $location, $timeout) {

        $scope.protocol = taskData.name;

        $scope.progress = Math.round(taskData.pagesLeft / taskData.pagesTotal * 100);

        $scope.pagesTotal = taskData.pagesTotal;
    

        $scope.goToNextAvailablePage = function goToNextAvailablePage() {
            
            //TODO: Investigate why this timeout is nessesary to reset stepId ?
            $timeout(function() {
                $location.search({ stepId: 1});
            }, 0);

            $state.go('.', { pageId: taskData.nextAvailablePageId});            
        };


        $scope.activeUsers = [];

        userService.getUsers().then(function(response) {
            $scope.activeUsers = response;
        });

        /**
        * Mimic activity, by reloading randomzied mock data every 7 seconds
        * TODO: Remove this
        */
        var userRandom = $interval(function() {
            userService.getUsers().then(function(response) {
                $scope.activeUsers = response;
            });
        }, 7000);

        /**
        * Cleanup 
        */
        $scope.$on('$destroy', function() {
            $interval.cancel(userRandom);
        });


    };

    return editorController;

});