define([], function() {

    var policeController = /* @ngInject */ function policeController(helpers, EDITORURL) {

        var that = this;

        this.$onInit = function() {
            that.imageUrl = helpers.getImageUrlByPostId(this.metadata.post_id);

            //Determine the editor link visibility based on wether or not the user can edit
            that.showEditorLink = that.metadata.user_can_edit;

            that.editorUrl = EDITORURL + '/#/task/' + that.metadata.task_id + '/page/' + that.metadata.page_id + '/post/' + that.metadata.post_id;
            
        };

    };

    return policeController;
});