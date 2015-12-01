define([

], function() {

    var editorConfig = function editorConfig($stateProvider, $urlRouterProvider) {

        // For any unmatched url, redirect to /
        $urlRouterProvider.otherwise('/');

        
        // Now set up the states
        $stateProvider
            .state('editor', {
                url: "/",
                views: {
                    'header': {
                        templateUrl: 'editor/editor.header.tpl.html'
                    },
                    '': {
                        templateUrl: 'editor/editor.tpl.html'
                    }

                }
            })
            .state('state1.list', {
                url: "/list",
                templateUrl: "partials/state1.list.html",
                controller: function($scope) {
                    $scope.items = ["A", "List", "Of", "Items"];
                }
            })
            .state('state2', {
                url: "/state2",
                templateUrl: "partials/state2.html"
            })
            .state('state2.list', {
                url: "/list",
                templateUrl: "partials/state2.list.html",
                controller: function($scope) {
                    $scope.things = ["A", "Set", "Of", "Things"];
                }
            });





    };

    return editorConfig;

});
