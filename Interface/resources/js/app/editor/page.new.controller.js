define([

], function() {

    var pageNewController = /*@ngInject*/ function pageNewController($uibModal, taskData, taskUnitData, pageData, isDone, $scope, $rootScope, pageService, $timeout, $state) {

        this.nextPost = pageData.next_post;
        this.posts = pageData.posts;
        this.postsPrPage = taskUnitData.columns * taskUnitData.rows;

        this.init = function() {
            if (isDone) {
                $timeout(function () {
                    $state.go('editor.page.pageDone', {
                        taskId: taskData.id,
                        pageId: pageData.id
                    });
                }, 0);
                return;
            }

            $rootScope.$broadcast('zoom-out');

            // We can assume isDone is false
            if(this.posts.length == this.postsPrPage) {
                // If the posts are filled, go to next page
                this.goToNextAvailablePage();
            } else if (this.nextPost) {
                //Preselect button, based on if nextPost is available. 
                $timeout(function() {
                    $('#nextPost-button').focus();
                });
            }
        };
        

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
                    } else {
                        $uibModal.open({

                            templateUrl: 'editor/missing.modal.tpl.html',
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

            })
            .catch(function(err) {
                console.log('Error setting page as done: ', err);
            });

        };

    };

    return pageNewController;

});
