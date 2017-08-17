define([


], function() {

    var pageDoneController = /*@ngInject*/ function pageDoneController(pageService, pageData, taskData, $timeout, $state) {

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
                }
            });
        };

    };

    return pageDoneController;
});
