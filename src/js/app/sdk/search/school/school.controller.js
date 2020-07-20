define([], function () {

    var schoolController = ['helpers', '$scope', function schoolController(helpers, $scope) {

        var that = this;

        $scope.isNumber = angular.isNumber;

        this.$onInit = function () {
            that.permalink = "https://kbharkiv.dk/permalink/post/" + that.data.id;
        }

        this.copy = function () {
            var copyText = document.querySelector("#permalink");
            copyText.select();
            document.execCommand("copy");
            copyText.className = "input copied"
            copyText.blur();
        };
    }];

    return schoolController;
});
