define([

], function() {

    var editorConfig = function editorConfig($stateProvider, $urlRouterProvider) {

        // For any unmatched url, redirect to /
        $urlRouterProvider.otherwise('/project/1/page/1/?stepId=1');


        // Now set up the states
        $stateProvider

            .state('editor', {

                url: "/",
                abstract: true,
                template: '<ui-view />'

            })
            .state('editor.project', {
                url: 'project/{id:int}',
                abstract: true,
                views: {

                    '': {
                        templateUrl: 'editor/editor.tpl.html',
                        controller: 'editorController'
                    },
                    
                    'header@': {
                        templateUrl: 'editor/editor.header.tpl.html',
                        controller: 'headerController'
                    }
                },
                resolve: {
                    /**
                     * Load project data and pass it to the controller
                     */
                    projectData: function($stateParams, projectService) {
                        return projectService.getProject($stateParams.id).then(function(response) {
                            return response;
                        });
                    }
                }
            })

            // .state('editor.project.page', {
            //     url: 'page/{pageId:int}',
            //     views: {
            //          '': {
            //             templateUrl: 'editor/editor.tpl.html',
            //             controller: 'editorController'
            //         },
            //     }
            // })

        .state('editor.project.wizard', {

            url: '/?{stepId:int}',
            reloadOnSearch: false,

            templateUrl: 'editor/wizard.tpl.html',
            controller: 'wizardController'
        });

    };

    return editorConfig;

});