define([

    'angular',
    'angular-auth0',
    'ngstorage',

    'angular-google-analytics',

    'angular-ui-router',
    '../../../../constants.json',

    './directives/user.directive',
    './directives/imageViewer.directive',
    './directives/imageViewerOverlay.directive',
    './directives/stepOf.directive',
    './directives/stepIndicator.directive',
    './directives/capitalizeFirst.directive',
    './directives/stringifyArray.directive',
    './directives/shareLink.directive',

    './directives/handleSteps.directive',

    './services/step.service',
    './services/task.service',
    './services/page.service',
    './services/user.service',
    './services/update.service',

    './services/error.service',
    './services/entry.service',

    './services/post.service',

    './services/unit.service',

    './services/token.service',
    './services/token.factory',

    './services/helpers.service',

    './filters/nameFromObject.filter',
    './filters/capitalize.filter',

    './constants/text.constant'

], function(

    ang,
    angularAuth0,
    ngStorage,
    AnalyticsProvider,
    uiRouter,
    constants,

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

    errorService,
    entryService,
    updateService,

    postService,
    unitService,

    tokenService,
    tokenFactory,

    helpersService,

    nameFromObjectFilter,
    capitalizeFilter,

    textConstant

    ) {

    var sharedApp = angular.module('shared', ['constants', 'ngStorage', 'ui.router','angular-google-analytics', 'auth0.auth0']);

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

    sharedApp.config(/*ngInject*/ function($httpProvider, AnalyticsProvider, angularAuth0Provider, $stateProvider, $locationProvider,$sceDelegateProvider) {
        $httpProvider.interceptors.push('tokenFactory');
 
        //Let's allow resources from kbhkilder.dk
        $sceDelegateProvider.resourceUrlWhitelist([
            'self',
            'https://*.kbhkilder.dk/**',
            'https://*.kbharkiv.dk/**'
        ]);

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

        // Add configuration code as desired
        AnalyticsProvider.setAccount('UA-45125468-1'); //UU-XXXXXXX-X should be your tracking code
        AnalyticsProvider.trackPages(true);
        AnalyticsProvider.ignoreFirstPageLoad(true);
        AnalyticsProvider.startOffline(true);
    });

    return sharedApp;

});
