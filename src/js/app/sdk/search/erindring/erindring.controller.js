define(['clipboard'], function(Clipboard) {
    var erindringController = ['$scope', 'API_URL', function erindringController($scope, API_URL) {
        var that = this;

        this.$onInit = function() {
            $scope.data = that.data;
            $scope.permalink = "https://kbharkiv.dk/permalink/post/" + that.data.id;

            var filename = that.data.filename;
            var extension = filename.substring(filename.lastIndexOf('.')+1, filename.length)
            $scope.fileExtension = extension;
        };

        this.getAssetHref = function() {
            var id = that.data.id.split("-")[1];
            return API_URL + "/asset/" + id;
        }

        this.getTranscribedAssetHref = function() {
            var id = that.data.transcribed_id;
            return API_URL + "/asset/" + id;
        }

        this.copy = function() {
            var clip = new Clipboard('#permalink_btn', {
                container: document.getElementById('#permalink')
            });
            return clip;
        };
    }];

    return erindringController;
});
