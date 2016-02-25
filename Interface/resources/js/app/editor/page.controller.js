define([

], function() {

    var editorController = /*@ngInject*/ function editorController($scope, $state, Flash, pageService, taskData, pageData, $location, $timeout, $rootScope) {       

        $scope.pageNumber = pageData.page_number;
        $scope.totalPages = 'xx';

        /**
        * Get next available page, based on unitId, taskId and the current page number
        */
        $scope.goToNextAvailablePage = function goToNextAvailablePage() {
            
            pageService.getNextAvailablePage({
                task_id: taskData.id,
                unit_id: pageData.unit_id,
                current_number: pageData.page_number

            }).then(function(response) {

                $timeout(function() {
                    $location.search({ stepId: 1});
                }, 0);

                $state.go('editor.page', { pageId: response.pages_id});     
            });
                   
        };

        $scope.goToPage = function goToPage($event) {
           
            //Enter key
            if ($event.charCode === 13) {

                var pageNumber = $event.target.value,
                    unitId = pageData.unit_id

                pageService.getPageByNumber(pageNumber, unitId).then(function(response) {

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

        $scope.nextPage = function nextPage() {

            var pageNumber = parseInt(pageData.page_number) + 1,
                unitId = pageData.unit_id;

            pageService.getPageByNumber(pageNumber, unitId).then(function(response) {

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

         $scope.prevPage = function prevPage() {

            var pageNumber = parseInt(pageData.page_number) - 1,
                unitId = pageData.unit_id;

            if (pageNumber <= 1) {
                Flash.create('warning', 'Siden med nummer ' + pageNumber +  ' findes ikke');
                return;
            }

            pageService.getPageByNumber(pageNumber, unitId).then(function(response) {

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

        $scope.options = {

            tileSources: {
                type: 'image',
                url: pageData.image_url,
                navigatorPosition: 'TOP_LEFT',
                overlays: pageData.posts
            },
            next_post: pageData.next_post

        };

        //Zooom to given area ?
        if (pageData.editArea) {
            $scope.editArea = pageData.editArea;
        }
        
    };

    return editorController;

});