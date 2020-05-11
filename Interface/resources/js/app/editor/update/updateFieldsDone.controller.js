define([

], function() {

    var updateFieldsDoneController = /*@ngInject*/ function updateFieldsDoneController(SEARCH_PERMALINK_URL, $scope, $location, $timeout, taskData, pageData, postData, stepService, entryService, $rootScope, $sessionStorage, errorService, $state) {

        //Build a direct link to this post
        $scope.shareLink = SEARCH_PERMALINK_URL + '/post/' + postData.entryData.solr_id;

        $scope.nextErrorReport = null;
        $scope.userId = $sessionStorage.tokenData.user_id;

        $scope.nextErrorReport = null;
        $scope.hasMoreErrors = null;

        $scope.$watch('nextErrorReport', function(newval) {
            if (newval && newval !== null) {
                $scope.hasMoreErrors = true;
            }
        });

        $scope.lookupNextPostWithErrors = function lookupNextPostWithErrors() {
            //Lookup all available error reports for the current user on this task
            return errorService.getErrorReports({
                relevant_user_id: $scope.userId,
                task_id: taskData.id
            }).then(function(response) {
                //If we havent got any more errors
                if (response.length === 0) {
                    $scope.noMoreErrorsForUser = true;
                }
                else {
                    $scope.nextErrorReport = response[0];
                }

            });
        };

        $scope.goToNextPostWithErrors = function goToNextPostWithErrors() {

            if ($scope.nextErrorReport !== null) {

                //Go to next post
                $state.go('editor.page.update', {
                    taskId: $scope.nextErrorReport.tasks_id,
                    pageId: $scope.nextErrorReport.pages_id,
                    postId: $scope.nextErrorReport.posts_id
                });
            }
        };

        $scope.init = function init() {

            //Determine if the user has more posts with errors reported
            $scope.lookupNextPostWithErrors().then(function() {

            });

        };

        $scope.init();

    };

    return updateFieldsDoneController;

});
