define([


], function() {

    var datapostController = /*@ngInject*/ function datapostController($stateParams, $scope) {
        $scope.data = $stateParams.data;
        $scope.metadata = $stateParams.metadata;
    };

    return datapostController;

});
