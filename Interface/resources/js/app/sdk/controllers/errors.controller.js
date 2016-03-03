define([

], function() {

    var errorsController = /*@ngInject*/ function mypageController($scope, tokenService, errorService, EDITORURL) {

        $scope.loading = false;
        $scope.errorList = [];

        $scope.userId = null;

        tokenService.requestToken().then(function(response) {
            var data = response.tokenData;
            $scope.userId = data.user_id;
            //Initialize logic
            $scope.init();
        });


        $scope.init = function() {

            $scope.loading = true;

            //Get error reports for a given user
            errorService.getErrorReports({
                relevant_user_id: $scope.userId,
                //TODO: Remove hardcoded taskid for beta
                task_id: 1
            }).then(function(response) {
                $scope.errorList = response;
            }).finally(function() {
                $scope.loading = false;
            });
        };

    };

    return errorsController;

});
