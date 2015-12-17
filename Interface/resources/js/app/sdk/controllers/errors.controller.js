define([

], function() {

    var errorsController = /*@ngInject*/ function mypageController($scope, errorService, EDITORURL) {

        $scope.loading = true;
        $scope.errorList = [];
       
        errorService.getData().then(function(response) {
            $scope.errorList = response;
        }).finally(function() {
            $scope.loading = false;
        });


    };

    return errorsController;

});