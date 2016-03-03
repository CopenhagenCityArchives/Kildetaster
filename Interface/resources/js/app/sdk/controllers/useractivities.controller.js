define([

], function() {

    var useractivitiesController = /*@ngInject*/ function mypageController($scope, tokenService, EDITORURL, userService) {

        $scope.loading = false;
        $scope.activities = [];

        $scope.userId = null;

        tokenService.requestToken().then(function(response) {
            var data = response.tokenData;
            $scope.userId = data.user_id;
            //Initialize logic
            $scope.init();
        });

        $scope.EDITORURL = EDITORURL;        

        $scope.init = function() {

            $scope.loading = true;

            //Get error reports for a given user
            userService.getUserActivities({
                user_id: $scope.userId
            }).then(function(response) {
                $scope.activities = response;

            }).finally(function() {
                $scope.loading = false;
            });
        };

    };

    return useractivitiesController;

});
