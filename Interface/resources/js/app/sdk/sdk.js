define([

    'angular',
    'angular-ui-bootstrap',

    'ngstorage',
    'angular-google-analytics',

    './sdk.run',
    '../shared/analyticsBootstrap',

    './search/search',

    './controllers/errors.controller',
    './controllers/useractivities.controller',
    './controllers/fritekst-search.controller',

    '../shared/services/token.service',
    '../shared/services/token.factory',

    '../shared/services/page.service',
    '../shared/services/task.service',
    '../shared/services/error.service',
    '../shared/services/user.service',

    './directives/user-statistics.directive',
    './directives/taskunits-list.directive',
    './directives/task-status.directive',
    './directives/task-progress-plot.directive',
    './directives/progressbar.directive',
    '../shared/directives/user.directive',
    '../shared/directives/shareLink.directive',
    '../../../../../constants.json'


], function(

    ang,
    angularBootstrap,

    ngStorage,
    angularGoogleAnalytics,

    sdkRun,
    analyticsBootstrap,

    searchApp,

    errorsController,
    useractivitiesController,
    fritekstSearchController,

    tokenService,
    tokenFactory,

    pageService,
    taskService,
    errorService,
    userService,

    userStatisticsDirective,
    taskunitsListDirective,
    taskStatusDirective,
    taskProgressPlotDirective,
    progressbarDirective,
    userDirective,
    shareLinkDirective,

    constants
) {

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

    //sdkApp.factory('accessTokenHttpInterceptor', tokenFactory);
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

    return sdkApp;

});