define([

], function() {

    var wizardDoneController = /*@ngInject*/ function wizardDoneController($scope, $state, pageData, taskData, $stateParams, pageService) {

        $scope.isFull = pageData.next_post === false;

        $scope.startNewOnSamePage = function startNewOnSamePage() {
            //Go to page for same project and page
            $state.go('^');
        };

        $scope.markDone = function() {

            pageService.pageIsDone({
                page_id: pageData.id,
                task_id: taskData.id
            })
            .then(function(response) {
                //After setting page as done, go to the state to show the user that the page is done
                $state.go('editor.page.pageDone', {
                    taskId: taskData.id,
                    pageId: pageData.id
                });

            })
            .catch(function(err) {
                console.log('Error setting page as done: ', err);
            });
        };
    };

    return wizardDoneController;

});