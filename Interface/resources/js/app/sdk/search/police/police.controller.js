define([], function() {

    var policeController = /*@ngInject*/ function policeController() {

        var that = this;

        this.$onInit = function() {

            // Set up post information
            that.imageFront = "http://politietsregisterblade.dk/registerblade/" + that.data.station + "/" + that.data.film + "/" + that.data.file_front + ".jpg";
            if (that.data.file_back !== 'noback') {
                that.imageBack = "http://politietsregisterblade.dk/registerblade/" + that.data.station + "/" + that.data.film + "/" + that.data.file_back + ".jpg";
            }
        };

    };

    return policeController;
});