define([

    'angular',
    'app/shared/shared',
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

    'app/editor/editor.config',
    'app/editor/editor.run',
    'app/shared/analyticsBootstrap',

    'app/editor/task.controller',
    'app/editor/page.controller',
    'app/editor/wizard.controller',
    'app/editor/wizard.done.controller',
    'app/editor/page.new.controller',
    'app/editor/page.done.controller',
    'app/editor/page.footer.controller',
    'app/editor/progressbar.directive',

    'app/editor/feedback/feedback.controller',
    'app/editor/update/updateFields.controller',
    'app/editor/update/updateFieldsSelection.controller',
    'app/editor/update/updateFieldsDone.controller',

    'app/shared/schemaformAddon/typeahead.addon',
    'app/shared/schemaformAddon/customInput.addon',
    'app/shared/schemaformAddon/customSelect.addon',
    'app/shared/schemaformAddon/customArray.addon'


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
    progressbarDirective,


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
        editorApp.directive('progressBar', progressbarDirective);


        angular.element(document).ready(function () {
            angular.bootstrap(angular.element('[data-editor-app]'), ['editor']);
        });

        return editorApp;

    });
