define([], function() {

    var policeController = function policeController($uibModal) {

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


        this.$onInit = function() {

            // Set up post information
            that.imageFront = "http://politietsregisterblade.dk/registerblade/" + that.data.station + "/" + that.data.film + "/" + that.data.file_front + ".jpg";
            if (that.data.file_back !== 'noback') {
                that.imageBack = "http://politietsregisterblade.dk/registerblade/" + that.data.station + "/" + that.data.film + "/" + that.data.file_back + ".jpg";
            }
        };

    };

    return policeController;
});