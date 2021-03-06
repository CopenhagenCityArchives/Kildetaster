var pageDoneController = ['$scope', '$timeout', '$state', '$uibModal', 'pageService', 'pageData', 'taskData', function pageDoneController($scope, $timeout, $state, $uibModal, pageService, pageData, taskData) {

    /**
    * Get next available page, based on unitId, taskId and the current page number
    */
    this.goToNextAvailablePage = function goToNextAvailablePage() {

        return pageService.getNextAvailablePage({
            task_id: taskData.id,
            unit_id: pageData.unit_id,
            current_number: pageData.page_number

        }).then(function(response) {
            if(response.pages_id){
                $timeout(function() {
                    $state.go('editor.page', { pageId: response.pages_id});
                }, 0);
            } else {
                $uibModal.open({

                    template: require('./missing.modal.tpl.html'),
                    //The type of modal. The error modal makes more room for the error text
                    windowClass: 'modal--error',

                    //Make wizard scope available to the modal
                    scope: $scope,

                    controller: ['$scope', function($scope) {
                        $scope.dismiss = function() {
                            $scope.$dismiss();
                        };
                    }]
                });

            }
        });
    };

}];

export default pageDoneController;
