define([

    'angular',
    'app/shared/shared',
    'angular-bootstrap',
    'angular-ui-router',
    'angular-ui-select',
    'angular-sanitize',

    'app/editor/editor.config',
    'app/editor/editor.run',

    'app/editor/task.controller',
    'app/editor/page.controller',
    'app/editor/wizard.controller',
    'app/editor/wizard.done.controller',


], function(

    ang,
    shared,
    angBootstrap,
    uiRouter,
    uiSelect,
    ngSanitize,

    editorConfig,
    editorRun,

    taskController,
    pageController,
    wizardController,
    wizardDoneController

) {

    var editorApp = angular.module('editor', ['shared', 'ui.bootstrap', 'ui.router', 'ui.select', 'ngSanitize']);

    editorApp.config(editorConfig);
    editorApp.run(editorRun);

    editorApp.controller('taskController', taskController);
    editorApp.controller('pageController', pageController);
    editorApp.controller('wizardController', wizardController);
    editorApp.controller('wizardDoneController', wizardDoneController);

    angular.element(document).ready(function() {
        angular.bootstrap(angular.element('[data-editor-app]'), ['editor']);
    });




    //Debugging for ui.router state issues
    // app.run(($rootScope) => {
    //     $rootScope.$on("$stateChangeError", console.log.bind(console));
    // });

    return editorApp;

});
