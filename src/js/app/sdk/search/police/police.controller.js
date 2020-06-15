define([

    'clipboard'

], function(Clipboard) {

    var policeController = function policeController() {

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
    };

    return policeController;
});