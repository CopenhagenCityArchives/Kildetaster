define([

    'angular',

    'ngstorage',

    'app/shared/sdk-templates',

    'app/sdk/sdk.run',

    'app/sdk/search/search',

    'app/sdk/controllers/mypage.controller',
    'app/sdk/controllers/opentasks.controller',
    'app/sdk/controllers/errors.controller',

    'app/shared/services/token.service',
    'app/shared/services/token.factory',

    'app/shared/services/page.service',
    'app/shared/services/task.service',
    'app/shared/services/error.service',

    'app/sdk/directives/progressbar.directive',

    'app/shared/constants'


], function(

    ang,

    ngStorage,

    sdkTemplates,

    run,

    searchApp,

    mypageController,
    opentasksController,
    errorsController,

    tokenService,
    tokenFactory,

    pageService,
    taskService,
    errorService,

    progressbarDirective,

    constants
) {

    var sdkApp = angular.module('sdk', ['sdk-templates', 'search', 'constants', 'ngStorage']);

    sdkApp.run(run);

    sdkApp.config(function($httpProvider) {
        $httpProvider.interceptors.push('tokenFactory');
    });

    sdkApp.controller('mypageController', mypageController);
    sdkApp.controller('opentasksController', opentasksController);
    sdkApp.controller('errorsController', errorsController);

    //sdkApp.factory('accessTokenHttpInterceptor', tokenFactory);
    sdkApp.service('tokenService', tokenService);
    sdkApp.factory('tokenFactory', tokenFactory);

    sdkApp.service('pageService', pageService);
    sdkApp.service('taskService', taskService);
    sdkApp.service('errorService', errorService);   

    sdkApp.directive('progressBar', progressbarDirective);

    angular.element(document).ready(function() {
        angular.bootstrap(angular.element('[data-sdk-app]'), ['sdk']);
    });

    return sdkApp;

});
