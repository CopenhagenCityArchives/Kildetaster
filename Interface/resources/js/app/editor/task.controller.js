define([

], function() {

    //TODO move to core logic
    if (!Array.prototype.find) {
        Array.prototype.find = function(predicate) {
            if (this === null) {
                throw new TypeError('Array.prototype.find called on null or undefined');
            }
            if (typeof predicate !== 'function') {
                throw new TypeError('predicate must be a function');
            }
            var list = Object(this);
            var length = list.length >>> 0;
            var thisArg = arguments[1];
            var value;

            for (var i = 0; i < length; i++) {
                value = list[i];
                if (predicate.call(thisArg, value, i, list)) {
                    return value;
                }
            }
            return undefined;
        };
    }

    var editorController = /*@ngInject*/ function editorController(MAINDOMAIN, $scope, $state, taskData, pageData, requestToken, userService, $interval, $location, $timeout, taskService, pageService) {

        $scope.protocol = taskData.name;

        $scope.progress = Math.round(taskData.pagesLeft / taskData.pagesTotal * 100);

        $scope.pagesTotal = pageData.unitData.pages;

        $scope.pagesDone = pageData.unitData.tasks.find(function(data) {
            return data.tasks_id === taskData.id;
        }).pages_done;

        $scope.activeUsers = [];

        $scope.activeUser = requestToken.tokenData.profile;

        $scope.MAINDOMAIN = MAINDOMAIN;

        $scope.unit = pageData.unitData;

        $scope.buildSource = function() {
            return MAINDOMAIN + SDKCSSURL + "/ugle.gif";
        };


        // userService.getUsers().then(function(response) {
        //     $scope.activeUsers = response;
        // });

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
