define([], function() {

    var schoolController = /*@ngInject*/ function schoolController(helpers, $scope) {

        var that = this;

        $scope.isNumber = angular.isNumber;

    };

    return schoolController;
});
