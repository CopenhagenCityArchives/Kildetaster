import angular from 'angular';
import angularBootstrap from 'angular-ui-bootstrap';
import ngStorage from 'ngstorage';
import angularGoogleAnalytics from 'angular-google-analytics';

import sdkRun from './sdk.run';
import analyticsBootstrap from '../shared/analyticsBootstrap';

import sharedApp from '../shared/shared';
import searchApp from './search/search';


import tokenService from '../shared/services/token.service';
import tokenFactory from '../shared/services/token.factory';

import pageService from '../shared/services/page.service';
import taskService from '../shared/services/task.service';
import errorService from '../shared/services/error.service';
import userService from '../shared/services/user.service';
import helpersService from '../shared/services/helpers.service';

import useractivitiesDirective from './directives/useractivities/useractivities.directive';
import errorsDirective from './directives/errors/errors.directive';
import userStatisticsDirective from './directives/user-statistics.directive';
import taskunitsListDirective from './directives/taskunits-list.directive';
import taskStatusDirective from './directives/task-status.directive';
import taskProgressPlotDirective from './directives/task-progress-plot.directive';
import progressbarDirective from './directives/progressbar.directive';
import userDirective from '../shared/directives/user.directive';
import shareLinkDirective from '../shared/directives/shareLink.directive';
import galleryDirective from './directives/gallery.directive';
import tooltipDirective from './directives/tooltip.directive';
import focusDirective from './directives/focus.directive';
import constants from '../../../../constants.json';


import featherIconDirective from './directives/feather-icon.directive';

var sdkApp = angular.module('sdk', [
    'ui.bootstrap',
    'search',
    'constants',
    'ngStorage',
    'angular-google-analytics',
    'shared',
    'auth0.auth0'
]);

sdkApp.run(sdkRun);
sdkApp.run(analyticsBootstrap.run);

sdkApp.config(analyticsBootstrap.config);



sdkApp.service('tokenService', tokenService);
sdkApp.factory('tokenFactory', tokenFactory);

sdkApp.service('pageService', pageService);
sdkApp.service('taskService', taskService);
sdkApp.service('errorService', errorService);
sdkApp.service('userService', userService);
sdkApp.service('helpers', helpersService);

sdkApp.directive('errors', errorsDirective);
sdkApp.directive('useractivities', useractivitiesDirective);
sdkApp.directive('userStatistics', userStatisticsDirective);
sdkApp.directive('taskunitsList', taskunitsListDirective);
sdkApp.directive('taskStatus', taskStatusDirective);
sdkApp.directive('taskProgressPlot', taskProgressPlotDirective);
sdkApp.directive('progressBar', progressbarDirective);
sdkApp.directive('user', userDirective);
sdkApp.directive('shareLink', shareLinkDirective);
sdkApp.directive('tooltip', tooltipDirective);
sdkApp.directive('gallery', galleryDirective);
sdkApp.directive('focus', focusDirective);


sdkApp.directive('featherIcon', featherIconDirective);

angular.element(document).ready(function() {
    angular.bootstrap(angular.element('[data-sdk-app]'), ['sdk'], { strictDi: true });
});

export default sdkApp;