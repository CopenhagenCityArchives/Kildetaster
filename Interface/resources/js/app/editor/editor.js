define([

    'angular',
    'app/shared/shared',
    'angular-bootstrap',
    'angular-ui-router',
    'angular-ui-select',
    'angular-sanitize',
    'angular-animate',

    'app/editor/editor.config',
    'app/editor/editor.run',

    'app/editor/task.controller',
    'app/editor/page.controller',
    'app/editor/wizard.controller',
    'app/editor/wizard.done.controller',

    'app/editor/feedback/feedback.controller',
    'app/editor/update/updateFields.controller'


], function(

    ang,
    shared,
    angBootstrap,
    uiRouter,
    uiSelect,
    ngSanitize,
    ngAnimate,

    editorConfig,
    editorRun,

    taskController,
    pageController,
    wizardController,
    wizardDoneController,

    feedbackController,
    updateFieldsController

) {

    var editorApp = angular.module('editor', ['shared', 'ui.bootstrap', 'ui.router', 'ui.select', 'ngSanitize', 'ngAnimate']);

    editorApp.config(editorConfig);
    editorApp.run(editorRun);

    editorApp.controller('taskController', taskController);
    editorApp.controller('pageController', pageController);
    editorApp.controller('wizardController', wizardController);
    editorApp.controller('wizardDoneController', wizardDoneController);
    editorApp.controller('feedbackController', feedbackController);
    editorApp.controller('updateFieldsController', updateFieldsController);

    angular.element(document).ready(function() {
        angular.bootstrap(angular.element('[data-editor-app]'), ['editor']);
    });

    return editorApp;

});
