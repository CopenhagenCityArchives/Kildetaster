define([

    'clipboard'

], function(Clipboard) {

    var policeController = ['helpers', 'EDITOR_URL', '$scope', function policeController(helpers, EDITOR_URL, $scope) {

        var that = this;

        $scope.isNumber = angular.isNumber;

        /**
         * Is the current logged in user allowed to edit?
         */
        function allowedToEdit() {

            var found = null;

            // If we do not have userdata and post data, do not allow editing
            if (!that.userData && that.data) {
                return false;
            }

            // did the current logged in user create the post?
            if (that.data.user_id == that.userData.id) {
                return true;
            }
            // Or is the current logged in user a superuser for the task the post was from
            else {

                found = that.userData.super_user_tasks.find(function(task) {
                    return task.tasks_id == that.data.task_id;
                });

                if (found) {
                    return true;
                }
            }
        }

        this.$onInit = function() {

            that.permalink = "https://kbharkiv.dk/permalink/post/" + that.data.id;

            that.imageUrl = helpers.getImageUrlByPostId(this.data.post_id);
            that.images = [that.imageUrl];

            //Determine the editor link visibility based on wether or not the user can edit
            that.showEditorLink = allowedToEdit();

            that.editorUrl = EDITOR_URL + '#/task/' + that.data.task_id + '/page/' + that.data.page_id + '/post/' + that.data.post_id;

        };

        this.copy = function() {
            var clip = new Clipboard('#permalink_btn', {
                container: document.getElementById('#permalink')});
            return clip;
        };

    }];

    return policeController;
});
