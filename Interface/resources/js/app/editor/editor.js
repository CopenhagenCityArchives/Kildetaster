define([

    'angular',
    '../shared/shared',
    'angular-ui-router',
    'angular-bootstrap',
    // Polyfill for ui-router events being deprecated @see https://ui-router.github.io/guide/ng1/migrate-to-1_0
    'angular-ui-router/stateEvents',
    'angular-ui-select',
    'angular-sanitize',
    'angular-animate',
    'angular-flash',
    'angular-google-analytics',

    'schemaForm',
    'angular-schema-form-bootstrap',

    './editor.config',
    './editor.run',
    '../shared/analyticsBootstrap',

    './task.controller',
    './page.controller',
    './wizard.controller',
    './wizard.done.controller',
    './page.new.controller',
    './page.done.controller',
    './page.footer.controller',

    './feedback/feedback.controller',
    './update/updateFields.controller',
    './update/updateFieldsSelection.controller',
    './update/updateFieldsDone.controller',

    '../shared/schemaformAddon/typeahead.addon',
    '../shared/schemaformAddon/customInput.addon',
    '../shared/schemaformAddon/customSelect.addon',
    '../shared/schemaformAddon/customArray.addon'


], function (

    ang,
    shared,
    angBootstrap,
    uiRouter,
    uiRouterStateevents,
    uiSelect,
    ngSanitize,
    ngAnimate,
    angularFlashAlert,
    angularGoogleAnalytics,

    angularSchemaForm,
    angularSchemaFormBootstrap,

    editorConfig,
    editorRun,
    analyticsBootstrap,

    taskController,
    pageController,
    wizardController,
    wizardDoneController,
    pageNewController,
    pageDoneController,
    pageFooterController,

    feedbackController,
    updateFieldsController,
    updateFieldsSelectionController,
    updateFieldsDoneController,

    sfTypeaheadAddon,
    sfCustomInputAddon,
    sfCustomSelectAddon,
    sfCustomArrayAddon

) {

        var editorApp = angular.module('editor', [
            'shared',
            'ui.bootstrap',
            'ui.router',
            'ui.router.state.events',
            'ui.select',
            'ngSanitize',
            'ngAnimate',
            'flash',
            'schemaForm',
            'angular-google-analytics'
        ]);

        editorApp.config(editorConfig);
        editorApp.config(analyticsBootstrap.config);
        editorApp.run(editorRun);
        editorApp.run(analyticsBootstrap.run);

        editorApp.controller('taskController', taskController);
        editorApp.controller('pageController', pageController);
        editorApp.controller('wizardController', wizardController);
        editorApp.controller('wizardDoneController', wizardDoneController);
        editorApp.controller('feedbackController', feedbackController);
        editorApp.controller('updateFieldsController', updateFieldsController);
        editorApp.controller('updateFieldsSelectionController', updateFieldsSelectionController);
        editorApp.controller('updateFieldsDoneController', updateFieldsDoneController);
        editorApp.controller('pageNewController', pageNewController);
        editorApp.controller('pageDoneController', pageDoneController);
        editorApp.controller('pageFooterController', pageFooterController);

        angular.element(document).ready(function () {
            angular.bootstrap(angular.element('[data-editor-app]'), ['editor']);
        });

        return editorApp;

    });
