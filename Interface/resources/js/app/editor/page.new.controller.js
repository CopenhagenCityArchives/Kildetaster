define([

], function() {

    var pageNewController = /*@ngInject*/ function pageNewController($uibModal, taskData, pageData, $scope, $rootScope, pageService, $timeout, $state) {

        this.nextPost = pageData.next_post;
        this.posts = pageData.posts;
        this.tasks = pageData.task_page;

        this.init = function() {
            $rootScope.$broadcast('zoom-out');
            
            var taskIdOne = this.tasks.find(function(element) {
                return element.tasks_id === taskData.id;
            });

            if(this.posts.length == 6 && taskData.is_done == 0) {
                //If 6 posts are filled, go to next page
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
