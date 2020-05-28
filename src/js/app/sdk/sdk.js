import angular from 'angular';
import angularBootstrap from 'angular-ui-bootstrap';
import ngStorage from 'ngstorage';
import angularGoogleAnalytics from 'angular-google-analytics';

import sdkRun from './sdk.run';
import analyticsBootstrap from '../shared/analyticsBootstrap';

import searchApp from './search/search';

import errorsController from './controllers/errors.controller';
import useractivitiesController from './controllers/useractivities.controller';
import fritekstSearchController from './controllers/fritekst-search.controller';

import tokenService from '../shared/services/token.service';
import tokenFactory from '../shared/services/token.factory';

import pageService from '../shared/services/page.service';
import taskService from '../shared/services/task.service';
import errorService from '../shared/services/error.service';
import userService from '../shared/services/user.service';

import userStatisticsDirective from './directives/user-statistics.directive';
import taskunitsListDirective from './directives/taskunits-list.directive';
import taskStatusDirective from './directives/task-status.directive';
import taskProgressPlotDirective from './directives/task-progress-plot.directive';
import progressbarDirective from './directives/progressbar.directive';
import userDirective from '../shared/directives/user.directive';
import shareLinkDirective from '../shared/directives/shareLink.directive';
import constants from '../../../../constants.json';

var sdkApp = angular.module('sdk', [
    'ui.bootstrap',
    'search',
    'constants',
    'ngStorage',
    'angular-google-analytics'
]);

sdkApp.run(sdkRun);
sdkApp.run(analyticsBootstrap.run);

sdkApp.config(analyticsBootstrap.config);

sdkApp.controller('errorsController', errorsController);
sdkApp.controller('useractivitiesController', useractivitiesController);
sdkApp.controller('fritekstSearchController', fritekstSearchController);

sdkApp.service('tokenService', tokenService);
sdkApp.factory('tokenFactory', tokenFactory);

sdkApp.service('pageService', pageService);
sdkApp.service('taskService', taskService);
sdkApp.service('errorService', errorService);
sdkApp.service('userService', userService);

sdkApp.directive('userStatistics', userStatisticsDirective);
sdkApp.directive('taskunitsList', taskunitsListDirective);
sdkApp.directive('taskStatus', taskStatusDirective);
sdkApp.directive('taskProgressPlot', taskProgressPlotDirective);
sdkApp.directive('progressBar', progressbarDirective);
sdkApp.directive('user', userDirective);
sdkApp.directive('shareLink', shareLinkDirective);

angular.element(document).ready(function() {
    angular.bootstrap(angular.element('[data-sdk-app]'), ['sdk']);
});

export default sdkApp;