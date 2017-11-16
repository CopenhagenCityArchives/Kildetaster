define([], function () {

    var postController = /*@ngInject*/ function postController(errorService, $uibModal) {

        var that = this;

        this.showErrorReports = false;

        this.postErrors = null;

        this.toggleErrorReports = function toggleErrorReports() {
            that.showErrorReports = !that.showErrorReports;
        }

        /**
         * Open error reporting modal
         */
        this.open = function open() {

            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'sdk/search/error-report/error-report.tpl.html',
                controller: 'errorReportController as $ctrl',
                resolve: {
                    errorReportingConfig: function () {
                        return that.errorReportingConfig;
                    },
                    postData: function () {
                        return that.data;
                    }
                }
            });

            modalInstance.result.then(function (response) {
                // console.log('this is the modal result', response);
            }, function () {

            });
        };


        this.$onInit = function () {

            var config = {
                id: this.data.id,
                collection_id: this.data.collection_id,

                // Only on burials
                task_id: this.data.task_id,
                post_id: this.data.post_id
            };

            errorService.getErrorReports(config).then(function(response) {
                that.postErrors = response;
            })
        };

    };

    return postController;
});