define([

    'angular',
    'angular-auth0',
    'ngstorage',

    'angular-google-analytics',

    'angular-ui-router',
    'app/shared/templates',
    'app/shared/constants',

    'app/shared/directives/user.directive',
    'app/shared/directives/imageViewer.directive',
    'app/shared/directives/imageViewerOverlay.directive',
    'app/shared/directives/stepOf.directive',
    'app/shared/directives/stepIndicator.directive',
    'app/shared/directives/capitalizeFirst.directive',
    'app/shared/directives/stringifyArray.directive',
    'app/shared/directives/shareLink.directive',

    'app/shared/directives/handleSteps.directive',

    'app/shared/services/step.service',
    'app/shared/services/task.service',
    'app/shared/services/page.service',
    'app/shared/services/user.service',
    'app/shared/services/update.service',

    'app/shared/services/error.service',
    'app/shared/services/entry.service',

    'app/shared/services/post.service',

    'app/shared/services/unit.service',

    'app/shared/services/token.service',
    'app/shared/services/token.factory',

    'app/shared/services/helpers.service',

    'app/shared/filters/nameFromObject.filter',
    'app/shared/filters/capitalize.filter',

    'app/shared/constants/text.constant'

], function(

    ang,
    angularAuth0,
    ngStorage,
    AnalyticsProvider,
    uiRouter,
    templates,
    constants,

    userDirective,
    imageViewerDirective,
    imageViewerOverlayDirective,
    stepOfDirective,
    stepIndicatorDirective,
    capitalizeFirst,
    stringifyArray,
    shareLinkDirective,

    handleStepsDirective,

    stepService,
    taskService,
    pageService,
    userService,
    updateService,

    errorService,
    entryService,

    postService,
    unitService,

    tokenService,
    tokenFactory,

    helpersService,

    nameFromObjectFilter,
    capitalizeFilter,

    textConstant

    ) {

    var sharedApp = angular.module('shared', ['templates', 'constants', 'ngStorage', 'ui.router','angular-google-analytics', 'auth0.auth0']);

    sharedApp.directive('user', userDirective);
    sharedApp.directive('imageViewer', imageViewerDirective);
    sharedApp.directive('imageViewerOverlay', imageViewerOverlayDirective);
    sharedApp.directive('stepOf', stepOfDirective);
    sharedApp.directive('stepIndicator', stepIndicatorDirective);
    sharedApp.directive('capitalizeFirst', capitalizeFirst);
    sharedApp.directive('stringifyArray', stringifyArray);
    sharedApp.directive('shareLink', shareLinkDirective);

    sharedApp.directive('handleSteps', handleStepsDirective);

    sharedApp.factory('stepService', stepService);
    sharedApp.factory('taskService', taskService);
    sharedApp.factory('pageService', pageService);
    sharedApp.factory('userService', userService);
    sharedApp.factory('updateService', updateService);
    sharedApp.factory('errorService', errorService);
    sharedApp.factory('entryService', entryService);

    sharedApp.factory('postService', postService);
    sharedApp.factory('unitService', unitService);

    sharedApp.factory('tokenService', tokenService); 
    sharedApp.factory('tokenFactory', tokenFactory);

    sharedApp.factory('helpers', helpersService);

    sharedApp.filter('nameFromObject', nameFromObjectFilter);
    sharedApp.filter('capitalize', capitalizeFilter);

    sharedApp.constant('TEXT', textConstant);

    sharedApp.run(function ($rootScope, TEXT) {
        $rootScope.TEXT = TEXT;
    });

    sharedApp.config(function($httpProvider) {
        $httpProvider.interceptors.push('tokenFactory');
    });

    sharedApp.config(['$httpProvider','AnalyticsProvider', 'angularAuth0Provider', '$stateProvider', '$locationProvider', function($httpProvider, AnalyticsProvider, angularAuth0Provider, $stateProvider, $locationProvider) {
        $httpProvider.interceptors.push('tokenFactory');
 
        angularAuth0Provider.init({
            clientID: 'uNrqzxblFnPrzQWpqMMBiB8h0VppBesM',
            domain: 'kbharkiv.eu.auth0.com'
        });

        // Prevent default use of !# hash bang urls
        // @see https://stackoverflow.com/questions/41226122/url-hash-bang-prefix-instead-of-simple-hash-in-angular-1-6
        $locationProvider.hashPrefix('');
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: true
        });

        // Global state for Auth0 login redirects
        $stateProvider.state('callbackFromAuth0',{
            url: '/login',
            resolve: {
                accessToken: ['tokenService', function(tokenService){
                    return tokenService.getTokenFromCallBack();
                }]
            },
            onEnter: ['accessToken', '$location', function(accessToken, $location){
                if(accessToken){
                    $location.url(accessToken.url);
                    console.log("logged in");
                    console.log(accessToken);
                }
            }]
        });

        // Add configuration code as desired
        AnalyticsProvider.setAccount('UA-45125468-1'); //UU-XXXXXXX-X should be your tracking code
        AnalyticsProvider.trackPages(true);
        AnalyticsProvider.ignoreFirstPageLoad(true);
        AnalyticsProvider.startOffline(true);
    }]);

    return sharedApp;

});
