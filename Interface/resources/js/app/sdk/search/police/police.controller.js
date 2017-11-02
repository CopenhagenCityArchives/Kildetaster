define([], function() {

    var policeController = function policeController() {

        var that = this;

        this.$onInit = function() {

            // Set up post information
            that.imageFront = "http://politietsregisterblade.dk/registerblade/" + that.metadata.station + "/" + that.metadata.film + "/" + that.metadata.file_front + ".jpg";
            if (that.metadata.file_back !== 'noback') {
                that.imageBack = "http://politietsregisterblade.dk/registerblade/" + that.metadata.station + "/" + that.metadata.film + "/" + that.metadata.file_back + ".jpg";
            }
        };

    };

    return policeController;
});