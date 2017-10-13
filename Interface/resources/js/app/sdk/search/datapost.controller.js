define([


], function() {

    var datapostController = /*@ngInject*/ function datapostController($stateParams, $scope) {
        $scope.data = $stateParams.data;
        $scope.metadata = $stateParams.metadata;
        $scope.highlighting = $stateParams.highlighting;
    };

    return datapostController;


});
