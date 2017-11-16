define([], function() {

    var policeController = /* @ngInject */ function policeController(helpers, EDITORURL) {

        var that = this;

        this.$onInit = function() {

            that.imageUrl = helpers.getImageUrlByPostId(this.data.post_id);

            //Determine the editor link visibility based on wether or not the user can edit
            that.showEditorLink = that.data.user_can_edit;

            that.editorUrl = EDITORURL + '/#/task/' + that.data.task_id + '/page/' + that.data.page_id + '/post/' + that.data.post_id;
            
        };

    };

    return policeController;
});