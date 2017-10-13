define([


], function() {

    var datapostController = /*@ngInject*/ function datapostController($stateParams, $scope, result) {
        $scope.highlighting = $stateParams.highlighting;
        var jsonData = JSON.parse(result.jsonObj);
        $scope.metadata = jsonData.metadata;
        $scope.data = jsonData.data;
    };

    return datapostController;


});
