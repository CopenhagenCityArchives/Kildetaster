define([

], function() {

    var wizardDoneController = /*@ngInject*/ function wizardDoneController($scope, $state, pageData, taskData, $stateParams, pageService) {

        $scope.isFull = pageData.next_post === false;

        $scope.startNewOnSamePage = function startNewOnSamePage() {
            //Go to page for same project and page
            $state.go('^');
        };

        /**
        * Event from confirmation modal to go ahead and mark page as done
        */
        $scope.$on('okToSetPageDone', function(event) {

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
        });

        $scope.markDone = function() {

            //If the page is full, skip the confirmation dialog, and mark the page directly
            if ($scope.isFull) {
                $scope.$broadcast('okToSetPageDone');
            }
            //otherwise show a confirmation dialog
            else {
                //Show confirmation modal
                $state.go('.confirm');
            }
        };
    };

    return wizardDoneController;

});
