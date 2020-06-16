define([

    'clipboard'

], function(Clipboard) {

    var erindringController = ['helpers', 'API_URL', 'EDITOR_URL', function erindringController(helpers, API_URL, EDITOR_URL) {

        var that = this;

        this.$onInit = function() {
            that.imageUrl = helpers.getImageUrlByPostId(this.data.post_id);

            that.permalink = "https://kbharkiv.dk/permalink/post/" + that.data.id;
            //Determine the editor link visibility based on wether or not the user can edit
            that.showEditorLink = that.data.user_can_edit;

            that.editorUrl = EDITOR_URL + '#/task/' + that.data.task_id + '/page/' + that.data.page_id + '/post/' + that.data.post_id;

        };

        this.getAssetHref = function() {
            var id = that.data.id.split("-")[1];
            return API_URL + "/asset/" + id;
        }

        this.getTranscribedAssetHref = function() {
            var id = that.data.transcribed_id;
            return API_URL + "/asset/" + id;
        }

        this.copy = function() {
            var clip = new Clipboard('#permalink_btn', {
                container: document.getElementById('#permalink')
            });
            return clip;
        };
    }];

    return erindringController;
});
