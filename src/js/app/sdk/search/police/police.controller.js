define([

    'clipboard'

], function(Clipboard) {

    var policeController = ['$state', 'errorService', function policeController($state, errorService) {

        var that = this;

        this.$onInit = function() {

            that.permalink = "https://kbharkiv.dk/permalink/post/" + that.data.id;
            // Set up post information
            that.imageFront = "http://politietsregisterblade.dk/registerblade/" + that.data.station + "/" + that.data.film + "/" + that.data.file_front + ".jpg";
            that.images = [that.imageFront];
            if (that.data.file_back !== 'noback') {
                that.imageBack = "http://politietsregisterblade.dk/registerblade/" + that.data.station + "/" + that.data.film + "/" + that.data.file_back + ".jpg";
                that.images = [that.imageFront, that.imageBack];
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
            var config = {
                id: this.data.id,
                collection_id: this.data.collection_id,
            };

            errorService.getErrorReports(config).then(function (response) {
                that.postErrors = response;
            });
        }

    }];

    return policeController;
});