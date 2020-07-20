var pageFooterController = ['$timeout', '$state', 'pageService', 'Flash', 'taskData', 'pageData', function pageFooterController($timeout, $state, pageService, Flash, taskData, pageData) {

    this.pageNumber = pageData.page_number;
    this.totalPages = pageData.unitData.pages;

    this.goToPage = function goToPage($event) {

        //Enter key
        if ($event.which === 13) {

            var pageNumber = $event.target.value,
                unitId = pageData.unit_id;

            pageService.getPageByNumber(taskData.id, pageNumber, unitId).then(function(response) {

                if (angular.isArray(response) && response.length === 0) {
                    Flash.create('warning', 'Siden med nummer ' + pageNumber +  ' findes ikke');
                }
                else {
                    $state.go('editor.page', {
                        pageId: response.id
                    });
                }

            });

        }

    };

    /**
    * Determine if the task this page belongs to is done ie. all pages typed
    */
    this.isDone = function isDone() {

        //Loop over all tasks, and find the one that match the one we are working on
        var thisTask = pageData.unitData.tasks.find(function(task) {
            return task.tasks_id === taskData.id;
        });

        //Are we done?
        return thisTask.index_active === 0 ? true : false;

    };


    /**
    * Get next available page, based on unitId, taskId and the current page number
    */
    this.goToNextAvailablePage = function goToNextAvailablePage() {

        pageService.getNextAvailablePage({
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

    this.nextPage = function nextPage() {

        var pageNumber = parseInt(pageData.page_number) + 1,
            unitId = pageData.unit_id;

        pageService.getPageByNumber(taskData.id, pageNumber, unitId).then(function(response) {

            if (angular.isArray(response) && response.length === 0) {
                Flash.create('warning', 'Siden med nummer ' + pageNumber +  ' findes ikke');
            }
            else {
                $state.go('editor.page', {
                    pageId: response.id
                });
            }

        });
    };

    this.prevPage = function prevPage() {

        var pageNumber = parseInt(pageData.page_number) - 1,
            unitId = pageData.unit_id;

        if (pageNumber === 0) {
            Flash.create('warning', 'Du er på første side');
            return;
        }

        pageService.getPageByNumber(taskData.id, pageNumber, unitId).then(function(response) {

            if (angular.isArray(response) && response.length === 0) {
                Flash.create('warning', 'Siden med nummer ' + pageNumber +  ' findes ikke');
            }
            else {
                $state.go('editor.page', {
                    pageId: response.id
                });
            }

        });
    };

}];

export default pageFooterController;
