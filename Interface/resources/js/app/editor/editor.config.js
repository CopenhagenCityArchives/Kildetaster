define([

], function() {

    var editorConfig = function editorConfig($stateProvider, $urlRouterProvider) {

        // For any unmatched url, redirect to /
        $urlRouterProvider.otherwise('/');

        
        // Now set up the states
        $stateProvider
            .state('editor', {
                
                url: "/",
                abstract: true,
                
                views: {
                    'header': {
                        templateUrl: 'editor/editor.header.tpl.html'
                    },
                    '': {
                        templateUrl: 'editor/editor.tpl.html',
                        controller: 'editorController'
                    },
                    

                }
            })
            .state('editor.wizard', {
                
                url: '',

                views: {
                    '': {
                        templateUrl: 'editor/wizard.tpl.html',
                        controller: 'wizardController'
                    }
                }
            })

    };

    return editorConfig;

});
