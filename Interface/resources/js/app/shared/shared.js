define([

    'angular',

    'ngstorage',

    'angular-google-analytics',

    '../../../../../constants.json',

    './directives/user.directive',
    './directives/imageViewer.directive',
    './directives/imageViewerOverlay.directive',
    './directives/stepOf.directive',
    './directives/stepIndicator.directive',
    './directives/capitalizeFirst.directive',
    './directives/progressbar.directive',
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

    ngStorage,
    AnalyticsProvider,
    constants,

    userDirective,
    imageViewerDirective,
    imageViewerOverlayDirective,
    stepOfDirective,
    stepIndicatorDirective,
    capitalizeFirst,
    progressbarDirective,
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

    var sharedApp = angular.module('shared', ['constants', 'ngStorage','angular-google-analytics']);

    sharedApp.directive('user', userDirective);
    sharedApp.directive('imageViewer', imageViewerDirective);
    sharedApp.directive('imageViewerOverlay', imageViewerOverlayDirective);
    sharedApp.directive('stepOf', stepOfDirective);
    sharedApp.directive('stepIndicator', stepIndicatorDirective);
    sharedApp.directive('capitalizeFirst', capitalizeFirst);
    sharedApp.directive('progressBar', progressbarDirective);
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

    sharedApp.config(['$httpProvider', 'AnalyticsProvider', function($httpProvider, AnalyticsProvider) {
        $httpProvider.interceptors.push('tokenFactory');


        // Add configuration code as desired
        AnalyticsProvider.setAccount('UA-45125468-1'); //UU-XXXXXXX-X should be your tracking code
        AnalyticsProvider.trackPages(true);
        AnalyticsProvider.ignoreFirstPageLoad(true);
        AnalyticsProvider.startOffline(true);
    }]);


    return sharedApp;

});
