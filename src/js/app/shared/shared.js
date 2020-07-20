import ang from 'angular';
import angularAuth0 from 'angular-auth0';
import ngStorage from 'ngstorage';
import AnalyticsProvider from 'angular-google-analytics';
import uiRouter from 'angular-ui-router';
import constants from '../../../../constants.json';

import userDirective from './directives/user.directive';
import imageViewerDirective from './directives/imageViewer.directive';
import imageViewerOverlayDirective from './directives/imageViewerOverlay.directive';
import stepOfDirective from './directives/stepOf.directive';
import stepIndicatorDirective from './directives/stepIndicator.directive';
import capitalizeFirstDirective from './directives/capitalizeFirst.directive';
import stringifyArrayDirective from './directives/stringifyArray.directive';
import shareLinkDirective from './directives/shareLink.directive';
import handleStepsDirective from './directives/handleSteps.directive';

import stepService from './services/step.service';
import taskService from './services/task.service';
import pageService from './services/page.service';
import userService from './services/user.service';
import errorService from './services/error.service';
import entryService from './services/entry.service';
import postService from './services/post.service';
import unitService from './services/unit.service';
import tokenService from './services/token.service';
import tokenFactory from './services/token.factory';
import helpersService from './services/helpers.service';
import callbackService from './services/callback.service';

import nameFromObjectFilter from './filters/nameFromObject.filter';
import capitalizeFilter from './filters/capitalize.filter';

import textConstant from './constants/text.constant';

var sharedApp = angular.module('shared', ['constants', 'ngStorage', 'ui.router','angular-google-analytics', 'auth0.auth0']);

sharedApp.directive('imageViewer', imageViewerDirective);
sharedApp.directive('imageViewerOverlay', imageViewerOverlayDirective);
sharedApp.directive('stepOf', stepOfDirective);
sharedApp.directive('stepIndicator', stepIndicatorDirective);
sharedApp.directive('capitalizeFirst', capitalizeFirstDirective);
sharedApp.directive('stringifyArray', stringifyArrayDirective);
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
sharedApp.factory('callbackService', callbackService);

sharedApp.filter('nameFromObject', nameFromObjectFilter);
sharedApp.filter('capitalize', capitalizeFilter);

sharedApp.constant('TEXT', textConstant);

sharedApp.run(['$rootScope', 'TEXT', function ($rootScope, TEXT) {
    $rootScope.TEXT = TEXT;
}]);

sharedApp.config(['$httpProvider', 'AnalyticsProvider', 'angularAuth0Provider', '$locationProvider', '$sceDelegateProvider', 'AUTH0_CLIENTID', 'AUTH0_DOMAIN', 'ANALYTICS_ACCOUNT', function($httpProvider, AnalyticsProvider, angularAuth0Provider, $locationProvider,$sceDelegateProvider, AUTH0_CLIENTID, AUTH0_DOMAIN, ANALYTICS_ACCOUNT) {
    $httpProvider.interceptors.push('tokenFactory');

    //Let's allow resources from kbhkilder.dk
    $sceDelegateProvider.resourceUrlWhitelist([
        'self',
        'https://*.kbhkilder.dk/**',
        'https://*.kbharkiv.dk/**',
        'http://localhost:8080/**'
    ]);

    angularAuth0Provider.init({
        clientID: AUTH0_CLIENTID,
        domain: AUTH0_DOMAIN
    });

    // Prevent default use of !# hash bang urls
    // @see https://stackoverflow.com/questions/41226122/url-hash-bang-prefix-instead-of-simple-hash-in-angular-1-6
    $locationProvider.hashPrefix('');
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: true
    });

    // Add configuration code as desired
    AnalyticsProvider.setAccount(ANALYTICS_ACCOUNT); //UU-XXXXXXX-X should be your tracking code
    AnalyticsProvider.trackPages(true);
    AnalyticsProvider.ignoreFirstPageLoad(true);
    AnalyticsProvider.startOffline(true);
}]);

export default sharedApp;