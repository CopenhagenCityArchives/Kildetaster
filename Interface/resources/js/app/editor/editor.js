define([

    'angular',
    'app/shared/shared',
    'angular-bootstrap',
    'angular-ui-router',
    'angular-ui-select',
    'angular-sanitize',
    'angular-animate',
    'angular-flash',

    'schemaForm',
    'angular-schema-form-bootstrap',

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
    angularFlashAlert,

    angularSchemaForm,
    angularSchemaFormBootstrap,

    editorConfig,
    editorRun,

    taskController,
    pageController,
    wizardController,
    wizardDoneController,

    feedbackController,
    updateFieldsController

) {

    var editorApp = angular.module('editor', [
        'shared',
        'ui.bootstrap',
        'ui.router',
        'ui.select',
        'ngSanitize',
        'ngAnimate',
        'flash',
        'schemaForm'
    ]);

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
