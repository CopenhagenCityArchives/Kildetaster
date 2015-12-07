define([

], function() {

    var editorConfig = function editorConfig($stateProvider, $urlRouterProvider) {

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
                pageData: function($stateParams, pageService) {
                    return pageService.getPage($stateParams.pageId).then(function(response) {
                        return response;
                    });
                }
            }
        })

        .state('editor.page.wizard', {

            url: '/?{stepId:int}',
            //Prevent reinitializing the controller when changing steps, handled with watch in the controller instead
            reloadOnSearch: false,

            templateUrl: 'editor/wizard.tpl.html',
            controller: 'wizardController'
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

        .state('error', {
            url: '/error',
            templateUrl: 'editor/error.tpl.html',
            controller: function() {

            }

        });

    };

    return editorConfig;

});
