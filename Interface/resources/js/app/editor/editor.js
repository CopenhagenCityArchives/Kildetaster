define([

    'angular',
    'app/shared/shared',
    'angular-bootstrap',
    'angular-ui-router',
    'angular-ui-select',
    'angular-sanitize',

    'app/editor/editor.config',

    'app/editor/header.controller',
    'app/editor/editor.controller',
    'app/editor/wizard.controller',
    

], function(
    
    ang,
    shared,
    angBootstrap,
    uiRouter,
    uiSelect,
    ngSanitize,

    editorConfig,
    
    headerController,
    editorController,
    wizardController
    
    ) {

    var editorApp = angular.module('editor', ['shared', 'ui.bootstrap', 'ui.router', 'ui.select', 'ngSanitize']);

    editorApp.config(editorConfig);

    editorApp.controller('headerController', headerController);
    editorApp.controller('editorController', editorController);
    editorApp.controller('wizardController', wizardController);

    angular.element(document).ready(function() {
        angular.bootstrap(angular.element('[data-editor-app]'), ['editor']);
    });

    return editorApp;

});