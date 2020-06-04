define([


], function () {

    var editorConfig = /*@ngInject*/ function editorConfig($stateProvider, $urlRouterProvider) {

        // For any unmatched url, redirect to /
        $urlRouterProvider.otherwise('/error');

        // Now set up the states
        $stateProvider
       //     .state('callbackFromAuth0',tokenService.stateConfig)

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

                    userData: ['tokenService', function (tokenService) {
                        return tokenService.getUserData();
                    }],

                    /**
                     * Load project data and pass it to the controller
                     */
                    taskData: ['$stateParams', 'taskService', '$q', function ($stateParams, taskService, $q) {

                        var deferred = $q.defer(),
                            data;

                        return taskService.getTask($stateParams.taskId).then(function (response) {
                            return response;
                        });
                    }],

                    /**
                     * Load page data and pass it to the controller
                     */
                    pageData: ['$stateParams', 'pageService', 'unitService', '$q', '$state', '$timeout', function ($stateParams, pageService, unitService, $q, $state, $timeout) {

                        var deferred = $q.defer(),
                            data;

                        pageService.getPageById($stateParams.pageId, $stateParams.taskId).then(function (response) {

                            if (response) {

                                data = response;

                                // //If we do not have a next_post, the page is 'done' and no more posts can be created
                                // if (response.next_post === false) {
                                //     $timeout(function() {
                                //         //Redirect to pageIsDone
                                //         $state.go('editor.page.pageIsDone');
                                //     }, 0);
                                // }

                            } else {
                                deferred.reject('Error', response);
                            }

                            return unitService.getUnit(response.unit_id);

                        })
                            .then(function (response) {
                                data.unitData = response;

                                deferred.resolve(data);
                            });

                        return deferred.promise;

                    }]

                }

            })

            .state('editor.page', {
                url: '',
                redirectTo: 'editor.page.new',
                views: {
                    '': {
                        templateUrl: 'editor/page.tpl.html',
                        controller: 'pageController'
                    },
                    'pageFooter': {
                        templateUrl: 'editor/page.footer.tpl.html',
                        controller: 'pageFooterController as $ctrl'
                    }
                }
            })

            .state('editor.page.new', {
                url: '/new',
                templateUrl: 'editor/page.new.tpl.html',
                controller: 'pageNewController as $ctrl',
                resolve: {

                    //Determine if the page is marked as done, and if it is, show the pageDone state
                    isDone: ['$q', 'pageData', function ($q, pageData) {

                        var deferred = $q.defer();

                        if (pageData.task_page == undefined) {
                            deferred.reject('could not find task page');
                        }

                        deferred.resolve(pageData.task_page.is_done === 1);

                        return deferred.promise;
                    }],

                    taskUnitData: ['$q', 'taskService', 'taskData', 'pageData', function ($q, taskService, taskData, pageData) {
                        var deferred = $q.defer();

                        taskService.getUnits({ unit_id: pageData.unit_id, task_id: taskData.id })
                        .then(function(taskUnits) {
                            if (taskUnits.length === 1) {
                                deferred.resolve(taskUnits[0]);
                            } else {
                                deferred.reject('must be exactly one unit');
                            }
                        })
                        .catch(function(err) {
                            deferred.reject(err);
                        });

                        return deferred.promise;
                    }]
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

                    postData: ['$stateParams', '$q', 'entryService', 'postService', 'errorService', function ($stateParams, $q, entryService, postService, errorService) {

                        var deferred = $q.defer(),
                            data = {
                                postId: $stateParams.postId
                            };

                        postService.getData($stateParams.postId).then(function (response) {

                            //Get the entry id from the first item in the array
                            //All items in the array have the same entryId
                            //TODO: Get an updated api in the backend to retur the entryId in the metadata property instead
                            data.entryId = response.data[0].entry_id;

                            return entryService.getEntry(data.entryId);

                        })
                            .then(function (response) {

                                data.entryData = response;

                                return errorService.getErrorReports({
                                    task_id: $stateParams.taskId,
                                    post_id: $stateParams.postId
                                });

                            })
                            .then(function (response) {

                                data.errorReports = response;

                                deferred.resolve(data);
                            });

                        return deferred.promise;

                    }]
                }
            })

            .state('editor.page.update.selection', {
                url: '/selection',
                views: {
                    '@editor.page': {
                        templateUrl: 'editor/update/updateFields.selection.tpl.html',
                        controller: 'updateFieldsSelectionController'
                    }
                }
            })

            .state('editor.page.update.done', {
                url: '/done',
                views: {
                    '@editor.page': {
                        templateUrl: 'editor/update/updateFields.done.tpl.html',
                        controller: 'updateFieldsDoneController'
                    }
                }
            })

            .state('editor.page.notfound', {
                url: '',
                views: {
                    '@editor': {
                        templateUrl: 'editor/page.notfound.tpl.html',
                        controller: function () {
                            alert('Page not found');
                        }
                    },
                }
            })

            .state('editor.page.new.wizard', {

                url: '/?{stepId:int}',
                //Prevent reinitializing the controller when changing steps, handled with watch in the controller instead
                reloadOnSearch: false,

                views: {
                    '@editor.page': {
                        templateUrl: 'editor/wizard.tpl.html',
                        controller: 'wizardController',
                    }
                },
                resolve: {

                    /**
                    * Test if we are starting from stepId == 1, and if not redirect to stepId = 1
                    * We can do this because the route is set to not to reload on search. The changes
                    * are instead handled via a watcher in the wizardController
                    */
                    fromStart: ['$q', '$stateParams', '$location', function ($q, $stateParams, $location) {
                        var deferred = $q.defer();

                        if ($stateParams.stepId !== undefined) {
                            $location.search({});
                        }
                        deferred.resolve();

                        return deferred.promise;
                    }]
                }
            })

            .state('editor.page.new.wizard.confirm', {

                onEnter: ['$stateParams', '$state', '$uibModal', function ($stateParams, $state, $uibModal) {
                    $uibModal.open({

                        templateUrl: 'editor/confirm.modal.tpl.html',
                        windowClass: 'modal--center',

                        controller: ['$scope', '$rootScope', function ($scope, $rootScope) {
                            $scope.dismiss = function () {
                                $scope.$dismiss();
                            };

                            $scope.continue = function () {
                                $rootScope.$broadcast('okToSetPageDone');
                                $scope.$dismiss();
                            };
                        }]
                    }).result.finally(function () {
                        //Go back to previous state
                        $state.go('^');
                    });
                }]
            })

            .state('editor.page.pageFull', {

                url: '/full',
                views: {
                    '@editor.page': {
                        templateUrl: 'editor/wizard.done.tpl.html',
                        controller: 'wizardDoneController'
                    }

                }
            })

            .state('editor.page.pageDone', {

                url: '/done',
                views: {
                    '': {
                        templateUrl: 'editor/page.done.tpl.html',
                        controller: 'pageDoneController as $ctrl'
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
                controller: ['ERRORURL', function (ERRORURL) {
                    //Redirect to a page on KBH joomla
                    //window.location.href = ERRORURL;
                }]

            });

    };

    return editorConfig;

});
