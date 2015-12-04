define([

], function() {

    var wizardDoneController = function wizardDoneController($scope, $state, $stateParams) {

        $scope.startNewOnSamePage = function startNewOnSamePage() {
            //Go to page for same project and page
            $state.go('^.^');
        };

        $scope.markDone = function() {
            alert("Page is done");
        };
    };

    return wizardDoneController;

});