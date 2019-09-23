define([

    'angular',
    'angular-bootstrap',

    'ngstorage',
    'angular-google-analytics',

    'app/shared/sdk-templates',

    'app/sdk/sdk.run',

    'app/sdk/search/search',

    'app/sdk/controllers/errors.controller',
    'app/sdk/controllers/useractivities.controller',
    'app/sdk/controllers/fritekst-search.controller',

    'app/shared/services/token.service',
    'app/shared/services/token.factory',

    'app/shared/services/page.service',
    'app/shared/services/task.service',
    'app/shared/services/error.service',
    'app/shared/services/user.service',

    'app/sdk/directives/taskunits-list.directive',
    'app/sdk/directives/task-status.directive',
    'app/sdk/directives/task-progress-plot.directive',
    'app/sdk/directives/progressbar.directive',
    'app/shared/directives/user.directive',
    'app/shared/directives/shareLink.directive',
    'app/shared/constants'


], function (

    ang,
    angularBootstrap,

    ngStorage,
    angularGoogleAnalytics,

    sdkTemplates,

    run,

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
            'sdk-templates',
            'search',
            'constants',
            'ngStorage',
            'angular-google-analytics'
        ]);

        sdkApp.config(['$httpProvider', 'AnalyticsProvider', function ($httpProvider, AnalyticsProvider) {
            $httpProvider.interceptors.push('tokenFactory');


            // Add configuration code as desired
            AnalyticsProvider.setAccount('UA-45125468-1');  //UU-XXXXXXX-X should be your tracking code
            AnalyticsProvider.trackPages(true);
            AnalyticsProvider.ignoreFirstPageLoad(true);
        }]);

        sdkApp.run(run);

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

        sdkApp.directive('taskunitsList', taskunitsListDirective);
        sdkApp.directive('taskStatus', taskStatusDirective);
        sdkApp.directive('taskProgressPlot', taskProgressPlotDirective);
        sdkApp.directive('progressBar', progressbarDirective);
        sdkApp.directive('user', userDirective);
        sdkApp.directive('shareLink', shareLinkDirective);



        angular.element(document).ready(function () {
            angular.bootstrap(angular.element('[data-sdk-app]'), ['sdk']);
        });

        return sdkApp;

    });
