define([

], function() {

    var editorConfig = /*@ngInject*/ function editorConfig($stateProvider, $urlRouterProvider) {

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
                taskData: function($stateParams, taskService) {
                    return taskService.getTask($stateParams.taskId).then(function(response) {
                        return response;
                    });
                }
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
                'pageDetails': {
                    templateUrl: 'editor/page.details.tpl.html',
                    controller: 'pageController'
                }
            },
            resolve: {
                /**
                 * Load page data and pass it to the controller
                 */
                pageData: function($stateParams, pageService, $q) {

                    var deferred = $q.defer();

                    pageService.getPage($stateParams.pageId).then(function(response) {

                        if (response) {
                            deferred.resolve(response);
                        } else {
                            deferred.reject('Error', response);
                        }

                    });

                    return deferred.promise;

                }
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

                /**
                * Test if we are starting from stepId == 1, and if not redirect to stepId = 1
                * We can do this because the route is set to not to reload on search. The changes
                * are instead handled via a watcher in the wizardController
                */
                fromStart: function($q, $stateParams, $location) {
                    var deferred = $q.defer();

                    if ($stateParams.stepId !== 1) {
                        $location.search({ stepId: 1 });
                    }
                    deferred.resolve();

                    return deferred.promise;
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
