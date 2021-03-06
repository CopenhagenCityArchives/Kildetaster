define([], function() {
    var efterretningController = ['$scope', 'API_URL', function erindringController($scope, API_URL) {
        var that = this;

        this.$onInit = function() {
            $scope.data = that.data;
            $scope.permalink = "https://kbharkiv.dk/permalink/post/" + that.data.id;
        };

        this.getAssetHref = function() {
            var id = that.data.id.split("-")[1];
            return API_URL + "/asset/" + id;
        }

        this.formatDate = function(datestring) {
          return moment(datestring).format("LL");
        }

        this.copy = function() {
            var clip = new Clipboard('#permalink_btn', {
                container: document.getElementById('#permalink')
            });
            return clip;
        };
    }];

    return efterretningController;
});
