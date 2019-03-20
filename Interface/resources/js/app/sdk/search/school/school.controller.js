define([], function () {

    var schoolController = /*@ngInject*/ function schoolController(helpers, $scope) {

        var that = this;

        $scope.isNumber = angular.isNumber;

        that.permalink = "https://kbharkiv.dk/permalink/post/" + that.data.id;

    };

    return schoolController;
});
