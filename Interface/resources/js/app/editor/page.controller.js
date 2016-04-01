define([

], function() {

    var editorController = /*@ngInject*/ function editorController($scope, $state, Flash, pageService, taskData, pageData, $location, $timeout, $rootScope) {       

        $scope.pageNumber = pageData.page_number;
        $scope.totalPages = pageData.unitData.pages;

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
                    $state.go('editor.page', { pageId: response.pages_id});     
                    //$location.search({ stepId: 1});
                }, 0);

                
            });
                   
        };

        $scope.goToPage = function goToPage($event) {
           
            //Enter key
            if ($event.charCode === 13) {

                var pageNumber = $event.target.value,
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

            if (pageNumber === 0) {
                Flash.create('warning', 'Du er på første side');
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

        var convertedPosts = [];
            
        //Openseadragon does not like a property called id, as it tries to find the dom node with that id.
        //Hack to rename the property, backend should do this
        pageData.posts.forEach(function(post) {

            var obj = {
                className: post.className,
                complete:post.complete,
                height: post.height,
                pages_id: post.pages_id,
                postId: post.id,
                width: post.width,
                x: post.x,
                y: post.y
            };
            convertedPosts.push(obj);

        });

        $scope.options = {

            tileSources: {
                type: 'image',
                url: pageData.image_url,
                navigatorPosition: 'TOP_LEFT',
                overlays: convertedPosts
            },
            //If the page is marked as done, do not show selection, eventhough next_post might contain a valid position overlay object
            next_post: pageData.task_page[0].is_done === 1 ? false : pageData.next_post

        };

        $rootScope.$on('zoom-to-post', function(event, data) {
            
            // $scope.options.zoomToPost = data.postId;
            $scope.editArea = convertedPosts.find(function(post) {
                return post.postId === data.postId;
            });
        });
        
    };

    return editorController;

});