define([

    'angular',
    'app/shared/shared',
    'angular-bootstrap',
    'angular-ui-router',
    'app/editor/header.controller',
    'app/editor/editor.config'

], function(
    
    ang,
    shared,
    angBootstrap,
    uiRouter,
    headerController,
    editorConfig

    ) {

    var editorApp = angular.module('editor', ['shared', 'ui.bootstrap', 'ui.router']);

    editorApp.config(editorConfig);

    editorApp.controller('headerController', headerController);

    angular.element(document).ready(function() {
        angular.bootstrap(angular.element('[data-editor-app]'), ['editor']);
    });

    return editorApp;

});