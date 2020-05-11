define([], function() {

    var erindringController = /*@ngInject*/ function erindringController(helpers, API_ENDPOINT, EDITOR_URL) {

        var that = this;

        this.$onInit = function() {
            that.imageUrl = helpers.getImageUrlByPostId(this.data.post_id);

            that.permalink = "https://kbharkiv.dk/permalink/post/" + that.data.id;
            //Determine the editor link visibility based on wether or not the user can edit
            that.showEditorLink = that.data.user_can_edit;

            that.editorUrl = EDITOR_URL + '/#/task/' + that.data.task_id + '/page/' + that.data.page_id + '/post/' + that.data.post_id;

        };

        this.getAssetHref = function() {
            var id = that.data.id.split("-")[1];
            return API_ENDPOINT + "/asset/" + id;
        }

        this.getTranscribedAssetHref = function() {
            var id = that.data.transcribed_id;
            return API_ENDPOINT + "/asset/" + id;
        }

        this.copy = function() {
            var copyText = document.querySelector("#permalink");
            copyText.select();
            document.execCommand("copy");
            copyText.className = "input copied"
            copyText.blur();
        };
    };

    return erindringController;
});
