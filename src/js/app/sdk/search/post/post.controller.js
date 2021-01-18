define([], function () {

    var postController = ['errorService', '$uibModal', function postController(errorService, $uibModal) {

        var that = this;
        var config = null;

        this.showErrorReports = false;

        this.postErrors = null;

        this.toggleErrorReports = function toggleErrorReports() {
            that.showErrorReports = !that.showErrorReports;
        }

        this.$onInit = function () {

            config = {
                id: this.data.id,
                collection_id: this.data.collection_id,

                // Only on burials
                task_id: this.data.task_id,
                post_id: this.data.post_id
            };

            errorService.getErrorReports(config).then(function(response) {
                that.postErrors = response;
            });
        };

        this.$onDestroy = function() {};

    }];

    return postController;
});
