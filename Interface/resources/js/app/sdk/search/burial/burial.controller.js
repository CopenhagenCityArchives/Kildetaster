define([], function() {

    var policeController = /* @ngInject */ function policeController(helpers) {

        var that = this;

        this.$onInit = function() {
            that.imageUrl = helpers.getImageUrlByPostId(this.metadata.post_id);
        };

    };

    return policeController;
});