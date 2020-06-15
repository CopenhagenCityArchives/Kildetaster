define([


], function () {

    var errorReportController = ['$uibModalInstance', 'errorService', 'postData', 'errorReportingConfig', function errorReportController($uibModalInstance, errorService, postData, errorReportingConfig) {

        var that = this;

        this.selected = null;
        this.selectedComment = null;

        this.errorService = errorService;
        this.postData = postData;

        // Lookup in the config to find the matching confic, based on collection_id
        this.errorReportingConfig = errorReportingConfig[this.postData.collection_id];

        this.saveErrorReport = function saveErrorReport() {

            var reportData = {
                id: this.postData.id,

                // Only exists on burials
                task_id: this.postData.task_id,
                post_id: this.postData.post_id,

                entity: this.selected.entity,
                field: this.selected.field,
                comment: this.selectedComment,
                add_metadata: this.errorReportingConfig.add_metadata,
                
                // used for police and erindring type posts
                collection_id: this.postData.collection_id
            };

            // Save the error report
            that.errorService.createErrorReport(reportData).then(function(response) {
                $uibModalInstance.close(reportData);
            })
            .catch(function(err) {
                console.log('Failed saving error report: ', err);
            });
        };

        /**
         * Cancel and close modal
         */
        this.cancel = function cancel() {
            $uibModalInstance.dismiss('cancel');
        };

    }];

    return errorReportController;

});
