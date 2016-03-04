define([
   

], function() {

    var editorConfig = /*@ngInject*/ function editorConfig($stateProvider, $urlRouterProvider, sfPathProvider, schemaFormProvider, schemaFormDecoratorsProvider, sfBuilderProvider) {

        // For any unmatched url, redirect to /
        $urlRouterProvider.otherwise('/error');

        // Now set up the states
        $stateProvider

            .state('editor', {
                url: '/task/{taskId:int}/page/{pageId:int}',
                abstract: true,
                views: {

                    '': {
                        templateUrl: 'editor/task.tpl.html',
                        controller: 'taskController'
                    }
                },

                
                resolve: {

                    requestToken: ['$q', 'tokenService', function($q, tokenService) {
                        return tokenService.requestToken();
                    }],
                   
                    /**
                     * Load project data and pass it to the controller
                     */
                    taskData: ['$stateParams', 'taskService', '$q', function($stateParams, taskService, $q) {

                        var deferred = $q.defer(),
                            data;
                        
                        return taskService.getTask($stateParams.taskId).then(function(response) {
                            return response;
                        });
                    }],

                    /**
                     * Load page data and pass it to the controller
                     */
                    pageData: ['$stateParams', 'pageService', 'unitService', '$q', '$state', '$timeout', function($stateParams, pageService, unitService, $q, $state, $timeout) {

                        var deferred = $q.defer(),
                            data;

                        pageService.getPageById($stateParams.pageId).then(function(response) {

                            if (response) {

                                data = response;

                                //If we do not have a next_post, the page is 'done' and no more posts can be created
                                if (response.next_post === false) {
                                    $timeout(function() {
                                        //Redirect to pageIsDone
                                        $state.go('editor.page.pageIsDone');
                                    }, 0);
                                }
                                
                            } else {
                                deferred.reject('Error', response);
                            }

                            return unitService.getUnit(response.unit_id);

                        })
                        .then(function(response) {
                            data.unitData = response;

                            deferred.resolve(data);
                        });

                        return deferred.promise;

                    }]

                }

            })

            .state('editor.page', {
                url: '',
                redirectTo: 'editor.page.wizard',
                views: {
                    '': {
                        templateUrl: 'editor/page.tpl.html',
                        controller: 'pageController'
                    },
                    'pageFooter': {
                        templateUrl: 'editor/page.footer.tpl.html',
                        controller: 'pageController'
                    }
                }
            })

            .state('editor.page.update', {
                url: '/post/{postId:int}',
                views: {
                    '': {
                        templateUrl: 'editor/update/updateFields.tpl.html',
                        controller: 'updateFieldsController',
                    }
                },
                resolve: {
                    
                    postData: ['$stateParams','$q', 'entryService', 'postService', 'errorService', function($stateParams, $q, entryService, postService, errorService) {
                        
                        var deferred = $q.defer(),
                            data = {
                                postId: $stateParams.postId
                            };                       

                        postService.getData($stateParams.postId).then(function(response) {

                            //Get the entry id from the first item in the array
                            //All items in the array have the same entryId
                            //TODO: Get an updated api in the backend to retur the entryId in the metadata property instead
                            data.entryId = response.data[0].entry_id;

                            return entryService.getEntry(data.entryId);
                            
                        })
                        .then(function(response) {

                            var redo = {};

                            //TODO: Get backend to output correct format
                            redo.persons = response.persons;
                            redo.persons.positions = response.positions;
                            redo.persons.deathcauses = response.deathcauses;
                            redo.persons.addresses = response.addresses;
                            redo.persons.burials = response.burials;

                            data.entryData = redo;

                            return errorService.getErrorReports({
                                task_id: $stateParams.taskId,
                                post_id: $stateParams.postId
                            });
                                                    
                        })
                        .then(function(response) {

                            data.errorReports = response;

                            deferred.resolve(data);
                        });                        

                        return deferred.promise;

                    }]
                }           
            })

            .state('editor.page.notfound', {
                url: '',
                views: {
                    '@editor': {
                        templateUrl: 'editor/page.notfound.tpl.html',
                        controller: function() {
                            alert('Page not found');
                        }
                    },
                }
            })

            .state('editor.page.wizard', {

                url: '/?{stepId:int}',
                //Prevent reinitializing the controller when changing steps, handled with watch in the controller instead
                reloadOnSearch: false,

                templateUrl: 'editor/wizard.tpl.html',
                controller: 'wizardController',
                resolve: {

                    isFull: ['$state', '$timeout', 'pageData', function($state, $timeout, pageData) {

                        if (pageData.next_post === false) {
                            $timeout(function() {
                                $state.go('editor.page.wizard.done');
                            }, 0);
                        }

                        return true;
                    }],

                    /**
                    * Test if we are starting from stepId == 1, and if not redirect to stepId = 1
                    * We can do this because the route is set to not to reload on search. The changes
                    * are instead handled via a watcher in the wizardController
                    */
                    fromStart: ['$q', '$stateParams', '$location', function($q, $stateParams, $location) {
                        var deferred = $q.defer();

                        if ($stateParams.stepId !== 1) {
                            //$location.search({ stepId: 1 });
                        }
                        deferred.resolve();

                        return deferred.promise;
                    }]
                }
            })

            .state('editor.page.pageIsDone', {

                url: '/done',
                views: {
                    '': {
                        templateUrl: 'editor/page.done.tpl.html'
                    }
                }
            })

            .state('editor.page.wizard.done', {

                url: '',
                views: {
                    '@editor.page': {
                        templateUrl: 'editor/wizard.done.tpl.html',
                        controller: 'wizardDoneController'
                    }

                }
            })


            .state('feedback', {

                url: '/feedback/{feedbackId:int}',
                templateUrl: 'editor/feedback/feedback.tpl.html',
                controller: 'feedbackController'
            })


            .state('error', {
                url: '/error',
                templateUrl: 'editor/error.tpl.html',
                controller: ['ERRORURL', function(ERRORURL) {
                    //Redirect to a page on KBH joomla
                    window.location.href = ERRORURL;
                }]

            });

    };

    return editorConfig;

});
