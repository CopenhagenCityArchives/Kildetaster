import angular from 'angular';
import shared from '../shared/shared';
import uiRouter from 'angular-ui-router';
import angBootstrap from 'angular-ui-bootstrap';
// Polyfill for ui-router events being deprecated @see https://ui-router.github.io/guide/ng1/migrate-to-1_0
import uiRouterStateevents from 'angular-ui-router/stateEvents';
import uiSelect from 'ui-select';
import ngSanitize from 'angular-sanitize';
import ngAnimate from 'angular-animate';
import angularFlashAlert from 'angular-flash-alert';
import angularGoogleAnalytics from 'angular-google-analytics';

import angularSchemaForm from 'angular-schema-form';
import angularSchemaFormBootstrap from 'angular-schema-form-bootstrap';

import editorConfig from './editor.config';
import editorRun from './editor.run';
import analyticsBootstrap from '../shared/analyticsBootstrap';

import taskController from './task.controller';
import pageController from './page.controller';
import wizardController from './wizard.controller';
import wizardDoneController from './wizard.done.controller';
import pageNewController from './page.new.controller';
import pageDoneController from './page.done.controller';
import pageFooterController from './page.footer.controller';

import feedbackController from './feedback/feedback.controller';
import updateFieldsController from './update/updateFields.controller';
import updateFieldsSelectionController from './update/updateFieldsSelection.controller';
import updateFieldsDoneController from './update/updateFieldsDone.controller';

import sfTypeaheadAddon from '../shared/schemaformAddon/typeahead.addon';
import sfCustomInputAddon from '../shared/schemaformAddon/customInput.addon';
import sfCustomSelectAddon from '../shared/schemaformAddon/customSelect.addon';
import sfCustomArrayAddon from '../shared/schemaformAddon/customArray.addon'

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
    angular.bootstrap(angular.element('[data-editor-app]'), ['editor'], { strictDi: true });
});

export default editorApp;