define([

], function() {

    var editorController = /*@ngInject*/ function editorController(taskData, pageData, $rootScope, pageService, $timeout, $state) {

        this.init = function() {
            $rootScope.$broadcast('zoom-out');
        };

        this.nextPost = pageData.next_post;

        /**
        * Get next available page, based on unitId, taskId and the current page number
        */
        this.goToNextAvailablePage = function goToNextAvailablePage() {

            pageService.pageIsDone({
                page_id: pageData.id,
                task_id: taskData.id
            })
            .then(function(response) {

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

            })
            .catch(function(err) {
                console.log('Error setting page as done: ', err);
            });

        };

    };

    return editorController;

});
