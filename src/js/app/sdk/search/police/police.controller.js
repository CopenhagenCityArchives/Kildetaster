define([

    'clipboard'

], function(Clipboard) {

    var policeController = ['$scope', '$state', 'errorService', function policeController($scope, $state, errorService) {
        var that = this;

        $scope.images = [];
        this.showErrorReports = false;

        this.$onInit = function() {
            $scope.data = that.data;
            $scope.permalink = "https://kbharkiv.dk/permalink/post/" + that.data.id;
            // Set up post information
            $scope.images.push("https://politietsregisterblade.dk/registerblade/" + that.data.station + "/" + that.data.film + "/" + that.data.file_front + ".jpg");
            if (that.data.file_back !== 'noback') {
                $scope.images.push("https://politietsregisterblade.dk/registerblade/" + that.data.station + "/" + that.data.film + "/" + that.data.file_back + ".jpg");
            }
        };

        this.copy = function() {
            var clip = new Clipboard('#permalink_btn', {
                container: document.getElementById('#permalink')
            });
            return clip;
        };

        this.goToPost = function(params) {
            var url = $state.href('.', {postId: params.post_id});
            window.open(url,'_blank');
        }

        this.refreshErrorReports = function refreshErrorReports() {
            that.hideErrorReporting();
            var config = {
                id: this.data.id,
                collection_id: this.data.collection_id,
            };

            errorService.getErrorReports(config).then(function (response) {
                $scope.postErrors = response;
            });
        }

        this.hideErrorReporting = function hideErrorReporting() {
            this.showErrorReports = false;
        };

    }];

    return policeController;
});