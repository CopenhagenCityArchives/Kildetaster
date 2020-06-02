define([

], function() {

    var editorController = /*@ngInject*/ function editorController(MAIN_DOMAIN, RESOURCE_URL, $scope, $state, taskData, pageData, requestToken, userService, $interval, $location, $timeout, taskService, pageService) {

        $scope.protocol = taskData.name;
        $scope.progress = Math.round(taskData.pagesLeft / taskData.pagesTotal * 100);
        $scope.pagesTotal = pageData.unitData.pages;
        $scope.pagesDone = pageData.unitData.tasks.find(function(data) {
            return data.tasks_id === taskData.id;
        }).pages_done;
        $scope.activeUsers = [];
        $scope.activeUser = requestToken.tokenData.profile;
        $scope.MAIN_DOMAIN = MAIN_DOMAIN;
        $scope.logoUrl = require('../../../images/ugle.gif').default;

        $scope.unit = pageData.unitData;

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
