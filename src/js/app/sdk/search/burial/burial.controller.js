define(['clipboard'], function(Clipboard) {
    var burialController = ['helpers', 'EDITOR_URL', '$scope', 'errorService', function(helpers, EDITOR_URL, $scope, errorService) {

        var that = this;
        $scope.isNumber = angular.isNumber;

        /**
         * Is the current logged in user allowed to edit?
         */
        function allowedToEdit() {
            return  true;
            
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

        that.$onInit = function() {
            $scope.data = that.data;
            $scope.permalink = "https://kbharkiv.dk/permalink/post/" + that.data.id;

            var imageUrl = helpers.getImageUrlByPostId(that.data.post_id);
            $scope.images = [imageUrl];

            //Determine the editor link visibility based on wether or not the user can edit
            $scope.showEditorLink = allowedToEdit();

            $scope.editorUrl = EDITOR_URL + '#/task/' + that.data.task_id + '/page/' + that.data.page_id + '/post/' + that.data.post_id;
        };

        this.copy = function() {
            var clip = new Clipboard('#permalink_btn', {
                container: document.getElementById('#permalink')});
            return clip;
        };

        this.refreshErrorReports = function refreshErrorReports() {
            var config = {
                id: this.data.id,
                collection_id: this.data.collection_id,

                task_id: this.data.task_id,
                post_id: this.data.post_id
            };

            errorService.getErrorReports(config).then(function (response) {
                $scope.postErrors = response;
            });
        }
    }];

    return burialController;
});