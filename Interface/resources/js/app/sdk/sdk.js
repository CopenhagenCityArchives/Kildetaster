define([

    'angular',
    'angular-bootstrap',

    'ngstorage',
    'angular-google-analytics',

    'app/shared/sdk-templates',

    'app/sdk/sdk.run',

    'app/sdk/search/search',

    'app/sdk/controllers/mypage.controller',
    'app/sdk/controllers/tasks.controller',
    'app/sdk/controllers/errors.controller',
    'app/sdk/controllers/useractivities.controller',
    'app/sdk/controllers/fritekst-search.controller',

    'app/shared/services/token.service',
    'app/shared/services/token.factory',

    'app/shared/services/page.service',
    'app/shared/services/task.service',
    'app/shared/services/error.service',
    'app/shared/services/user.service',

    'app/sdk/directives/progressbar.directive',
    'app/shared/directives/user.directive',
    'app/shared/constants'


], function(

    ang,
    angularBootstrap,

    ngStorage,
    angularGoogleAnalytics,

    sdkTemplates,

    run,

    searchApp,

    mypageController,
    tasksController,
    errorsController,
    useractivitiesController,
    fritekstSearchController,

    tokenService,
    tokenFactory,

    pageService,
    taskService,
    errorService,
    userService,

    progressbarDirective,
    userDirective,

    constants
) {

    var sdkApp = angular.module('sdk', [
        'ui.bootstrap',
        'sdk-templates', 
        'search', 
        'constants', 
        'ngStorage']);
        'angular-google-analytics'

    sdkApp.run(run);

    sdkApp.config(function($httpProvider) {
        $httpProvider.interceptors.push('tokenFactory');
    });

    sdkApp.controller('mypageController', mypageController);
    sdkApp.controller('tasksController', tasksController);
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

    sdkApp.directive('progressBar', progressbarDirective);
    sdkApp.directive('user', userDirective);

    angular.element(document).ready(function() {
        angular.bootstrap(angular.element('[data-sdk-app]'), ['sdk']);
    });

    return sdkApp;

});
