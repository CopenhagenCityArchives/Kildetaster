define([
   

], function() {

    var editorConfig = /*@ngInject*/ function editorConfig($stateProvider, $urlRouterProvider, sfPathProvider, schemaFormProvider, schemaFormDecoratorsProvider, sfBuilderProvider) {

        // For any unmatched url, redirect to /
        $urlRouterProvider.otherwise('/error');

        // Now set up the states
        $stateProvider

            .state('editor', {
                url: '/task/{taskId:int}',
                abstract: true,
                views: {

                    '': {
                        templateUrl: 'editor/task.tpl.html',
                        controller: 'taskController'
                    }
                },
                resolve: {
                    /**
                     * Load project data and pass it to the controller
                     */
                    taskData: ['$stateParams', 'taskService', function($stateParams, taskService) {
                        return taskService.getTask($stateParams.taskId).then(function(response) {
                            return response;
                        });
                    }]
                }

            })

            .state('editor.page', {
                url: '/page/{pageId:int}',
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
                },
                resolve: {
                    /**
                     * Load page data and pass it to the controller
                     */
                    pageData: ['$stateParams', 'pageService', '$q', '$state', '$timeout', function($stateParams, pageService, $q, $state, $timeout) {

                        var deferred = $q.defer();

                        pageService.getPageById($stateParams.pageId).then(function(response) {

                            if (response) {

                                deferred.resolve(response);

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

                        });

                        return deferred.promise;

                    }]
                }
            })

            .state('editor.update', {
                url: '/post/{postId:int}',
                views: {
                    '@editor.update': {
                        templateUrl: 'editor/update/updateFields.tpl.html',
                        controller: 'updateFieldsController',
                    },
                    '': {
                        templateUrl: 'editor/update/page.tpl.html',
                        controller: 'updateController'
                        
                    },
                    // '': {
                    //     templateUrl: 'editor/update/page.tpl.html',
                    //     controller: 'pageController'
                    // }
                },
                resolve: {
                    
                    postData: ['$stateParams','$q', 'entryService', 'errorService', function($stateParams, $q, entryService, errorService) {
                        
                        var deferred = $q.defer();

                        var data = {
                            postId: $stateParams.postId
                        };

                        errorService.getErrorReports({
                            task_id: $stateParams.taskId,
                            post_id: $stateParams.postId
                        })
                        .then(function(response) {
                            data.errorReports = response;
                            return entryService.getEntry(12);
                        })
                        .then(function(response) {
                            data.entryData = response;
                            deferred.resolve(data);
                        });                        

                        return deferred.promise;

                    }]
                }           
            })

            // .state('editor.update', {

            //     url: '/page/{pageId:int}/update/{updateId:int}',
                
            //     views: {
            //         '@editor.update': {
            //             templateUrl: 'editor/update/updateFields.tpl.html',
            //             controller: 'updateFieldsController',
            //         },
            //         '': {
            //             templateUrl: 'editor/update/page.tpl.html',
            //             controller: 'pageController'
            //         },

            //         'pageDetails': {
            //             templateUrl: 'editor/page.footer.tpl.html',
            //             controller: 'pageController'
            //         }
            //     },
               
            //     resolve: {

            //          /**
            //          * Load page data and pass it to the controller
            //          */
            //         pageData: function($stateParams, pageService, $q) {

            //             var deferred = $q.defer();

            //             pageService.getPageById($stateParams.pageId).then(function(response) {

            //                 if (response) {
            //                     deferred.resolve(response);
            //                 } else {
            //                     deferred.reject('Error', response);
            //                 }

            //             });

            //             return deferred.promise;

            //         },
                   
            //         updateData: function($stateParams, $q, updateService) {

            //             var deferred = $q.defer();

            //             updateService.getData().then(function(response) {
            //                 deferred.resolve(response);
            //             });

            //             return deferred.promise;

            //         }
            //     }
            // })

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
                                $state.go('editor.page.pageIsDone');
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
                controller: function() {

                }

            });

    };

    return editorConfig;

});
