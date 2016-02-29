define([

    'angular',
    'app/shared/templates',
    'app/shared/constants',

    'app/shared/directives/user.directive',
    'app/shared/directives/imageViewer.directive',
    'app/shared/directives/stepOf.directive',
    'app/shared/directives/stepIndicator.directive',
    'app/shared/directives/capitalizeFirst.directive',
    'app/shared/directives/progressbar.directive',
    'app/shared/directives/stringifyArray.directive',

    'app/shared/directives/handleSteps.directive',

    'app/shared/services/step.service',
    'app/shared/services/task.service',
    'app/shared/services/page.service',
    'app/shared/services/user.service',
    'app/shared/services/update.service',
    
    'app/shared/services/error.service',
    'app/shared/services/entry.service',
    
    'app/shared/services/post.service',

    'app/shared/services/helpers.service',

    'app/shared/filters/nameFromObject.filter',

    'app/shared/constants/text.constant'

], function(

    ang,
    templates,
    constants,

    userDirective,
    imageViewerDirective,
    stepOfDirective,
    stepIndicatorDirective,
    capitalizeFirst,
    progressbarDirective,
    stringifyArray,

    handleStepsDirective,    

    stepService,
    taskService,
    pageService,
    userService,
    updateService,
    
    errorService,
    entryService,
    
    postService,

    helpersService,

    nameFromObjectFilter,

    textConstant

    ) {

    var sharedApp = angular.module('shared', ['templates', 'constants']);

    sharedApp.directive('user', userDirective);
    sharedApp.directive('imageViewer', imageViewerDirective);
    sharedApp.directive('stepOf', stepOfDirective);
    sharedApp.directive('stepIndicator', stepIndicatorDirective);
    sharedApp.directive('capitalizeFirst', capitalizeFirst);
    sharedApp.directive('progressBar', progressbarDirective);
    sharedApp.directive('stringifyArray', stringifyArray);
        
    sharedApp.directive('handleSteps', handleStepsDirective);
    

    sharedApp.factory('stepService', stepService);
    sharedApp.factory('taskService', taskService);
    sharedApp.factory('pageService', pageService);
    sharedApp.factory('userService', userService);
    sharedApp.factory('updateService', updateService);
    sharedApp.factory('errorService', errorService);
    sharedApp.factory('entryService', entryService);
    sharedApp.factory('postService', postService);

    sharedApp.factory('helpers', helpersService);
    
    sharedApp.filter('nameFromObject', nameFromObjectFilter);

    sharedApp.constant('TEXT', textConstant);

    sharedApp.run(function ($rootScope, TEXT) {
        $rootScope.TEXT = TEXT;
    });

    return sharedApp;

});