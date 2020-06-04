define([

], function() {

    var editorController = /*@ngInject*/ function editorController(MAINDOMAIN, RESSOURCEURL, $scope, $state, taskData, pageData, userData, userService, $interval, $location, $timeout, taskService, pageService) {

        $scope.protocol = taskData.name;

        $scope.progress = Math.round(taskData.pagesLeft / taskData.pagesTotal * 100);

        $scope.pagesTotal = pageData.unitData.pages;

        $scope.pagesDone = pageData.unitData.tasks.find(function(data) {
            return data.tasks_id === taskData.id;
        }).pages_done;

        $scope.activeUsers = [];

        $scope.activeUser = userData;

        $scope.MAIN_DOMAIN = MAIN_DOMAIN;
        $scope.RESOURCE_URL = RESOURCE_URL;

        $scope.unit = pageData.unitData;

        $scope.buildSource = function() {
            return MAIN_DOMAIN + RESOURCE_URL + "/ugle.gif";
        };


         userService.getUsers(pageData.unit_id, taskData.id).then(function(response) {
             $scope.activeUsers = response;
         });

        /**
         * Mimic activity, by reloading randomzied mock data every 7 seconds
         * TODO: Remove this
         */
        // var userRandom = $interval(function() {
        //     userService.getUsers().then(function(response) {
        //         $scope.activeUsers = response;
        //     });
        // }, 7000);

        /**
         * Cleanup 
         */
        $scope.$on('$destroy', function() {
            //$interval.cancel(userRandom);
        });


    };

    return editorController;

});
