define([], function() {

    var policeController = /* @ngInject */ function policeController(helpers, EDITORURL, $uibModal) {

        var that = this;

        /**
         * Open error reporting modal
         */
        this.open = function open() {

            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'sdk/search/error-report/error-report.tpl.html',
                controller: 'errorReportController as $ctrl',
                resolve: {
                    errorReportingConfig: function() {
                        return that.errorReportingConfig;
                    },
                    postData: function() {
                        return that.data;
                    }
                }
            });

            modalInstance.result.then(function (response) {
                //console.log('this is the modal result', response);
            }, function () {
               
            });
        };

        this.$onInit = function() {

            that.imageUrl = helpers.getImageUrlByPostId(this.data.post_id);

            //Determine the editor link visibility based on wether or not the user can edit
            that.showEditorLink = that.data.user_can_edit;

            that.editorUrl = EDITORURL + '/#/task/' + that.data.task_id + '/page/' + that.data.page_id + '/post/' + that.data.post_id;
            
        };

    };

    return policeController;
});