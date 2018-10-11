define([], function() {

    var efterretningController = /*@ngInject*/ function erindringController(helpers, API, EDITORURL) {

        var that = this;

        this.$onInit = function() {
            that.imageUrl = helpers.getImageUrlByPostId(this.data.post_id);

            that.permalink = "https://kbharkiv.dk/permalink/post/" + that.data.id;
            
            //Determine the editor link visibility based on wether or not the user can edit
            that.showEditorLink = that.data.user_can_edit;

            that.editorUrl = EDITORURL + '/#/task/' + that.data.task_id + '/page/' + that.data.page_id + '/post/' + that.data.post_id;

        };

        this.getAssetHref = function() {
            var id = that.data.id.split("-")[1];
            return API + "/asset/" + id;
        }

        this.formatDate = function(datestring) {
          return moment(datestring).format("LL");
        }

    };

    return efterretningController;
});
