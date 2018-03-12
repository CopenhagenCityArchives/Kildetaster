define([], function() {

    var policeController = /*@ngInject*/ function policeController() {

        var that = this;

        this.$onInit = function() {

            that.permalink = "https://kbharkiv.dk/permalink/post/" + that.data.id + "/";
            // Set up post information
            that.imageFront = "http://politietsregisterblade.dk/registerblade/" + that.data.station + "/" + that.data.film + "/" + that.data.file_front + ".jpg";
            if (that.data.file_back !== 'noback') {
                that.imageBack = "http://politietsregisterblade.dk/registerblade/" + that.data.station + "/" + that.data.film + "/" + that.data.file_back + ".jpg";
            }
        };

        this.copy = function() {
            var copyText = document.querySelector("#permalink");
            copyText.select();
            document.execCommand("copy");
            copyText.className = "input copied"
            copyText.blur();
          };
    };

    return policeController;
});