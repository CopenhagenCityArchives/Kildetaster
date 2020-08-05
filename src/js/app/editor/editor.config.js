export default ["$stateProvider", "$urlRouterProvider", '$locationProvider', function editorConfig($stateProvider, $urlRouterProvider, $locationProvider) {
    // For any unmatched url, redirect to /
    $urlRouterProvider.otherwise('/error');

    // override shared html5mode
    $locationProvider.hashPrefix('');
    $locationProvider.html5Mode({
        enabled: false,
        requireBase: false
    });

    // Now set up the states
    $stateProvider
        .state('editor', {
            url: '/task/{taskId:int}/page/{pageId:int}',
            abstract: true,
            views: {
                '': {
                    template: require('./task.tpl.html'),
                    controller: 'taskController'
                }
            },

            resolve: {
                userData: ['authService', function (authService) {
                    return authService.getUser()
                    .catch(function(err) {
                        return authService.login()
                        .then(function() {
                            return authService.getUser()
                        })
                    });
                }],

                /**
                 * Load project data and pass it to the controller
                 */
                taskData: ['$stateParams', 'taskService', '$q', function ($stateParams, taskService, $q) {
                    return taskService.getTask($stateParams.taskId)
                    .then(function (response) {
                        return response;
                    });
                }],

                /**
                 * Load page data and pass it to the controller
                 */
                pageData: ['$stateParams', 'pageService', 'unitService', '$q', function ($stateParams, pageService, unitService, $q) {
                    var deferred = $q.defer(),
                        data;

                    pageService.getPageById($stateParams.pageId, $stateParams.taskId).then(function (response) {
                        if (response) {
                            data = response;
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
                    template: require('./page.tpl.html'),
                    controller: 'pageController'
                },
                'pageFooter': {
                    template: require('./page.footer.tpl.html'),
                    controller: 'pageFooterController as $ctrl'
                }
            }
        })

        .state('editor.page.new', {
            url: '/new',
            template: require('./page.new.tpl.html'),
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
                    template: require('./update/updateFields.tpl.html'),
                    controller: 'updateFieldsController',
                }
            },
            resolve: {
                userData: ['authService', function(authService) {
                    return authService.getUser();
                }],

                postData: ['$stateParams', '$q', 'entryService', 'postService', 'errorService', function($stateParams, $q, entryService, postService, errorService) {

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
                    template: require('./update/updateFields.selection.tpl.html'),
                    controller: 'updateFieldsSelectionController'
                }
            }
        })

        .state('editor.page.update.done', {
            url: '/done',
            views: {
                '@editor.page': {
                    template: require('./update/updateFields.done.tpl.html'),
                    controller: 'updateFieldsDoneController'
                }
            }
        })

        .state('editor.page.notfound', {
            url: '',
            views: {
                '@editor': {
                    template: require('./page.notfound.tpl.html'),
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
                    template: require('./wizard.tpl.html'),
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

        .state('editor.page.pageFull', {

            url: '/full',
            views: {
                '@editor.page': {
                    template: require('./wizard.done.tpl.html'),
                    controller: 'wizardDoneController'
                }

            }
        })

        .state('editor.page.pageDone', {

            url: '/done',
            views: {
                '': {
                    template: require('./page.done.tpl.html'),
                    controller: 'pageDoneController as $ctrl'
                }
            }
        })

        .state('feedback', {

            url: '/feedback/{feedbackId:int}',
            template: require('./feedback/feedback.tpl.html'),
            controller: 'feedbackController'
        })


        .state('error', {
            url: '/error',
            template: require('./error.tpl.html'),
            controller: ['ERROR_URL', function (ERROR_URL) {
                //Redirect to a page on KBH joomla
                window.location.href = ERROR_URL;
            }]

        });

}];