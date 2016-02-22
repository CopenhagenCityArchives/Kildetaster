define([

    'angular',

    'app/shared/sdk-templates',

    'angular-filter',

    'app/sdk/sdk.run',

    'app/sdk/controllers/mypage.controller',
    'app/sdk/controllers/opentasks.controller',
    'app/sdk/controllers/errors.controller',
    'app/sdk/controllers/search.controller',

    'app/shared/services/page.service',
    'app/shared/services/task.service',
    'app/shared/services/error.service',
    'app/shared/services/search.service',

    'app/sdk/directives/searchresult.directive',

    'app/shared/constants'


], function(

    ang,

    angularFilter,

    sdkTemplates,
    
    run,
    
    mypageController,
    opentasksController,
    errorsController,
    searchController,

    pageService,
    taskService,
    errorService,
    searchService,

    searchResultDirective,
    
    constants
) {

    var sdkApp = angular.module('sdk', ['sdk-templates', 'constants', 'angular.filter']);

    sdkApp.run(run);

    sdkApp.controller('mypageController', mypageController);
    sdkApp.controller('opentasksController', opentasksController);
    sdkApp.controller('errorsController', errorsController);
    sdkApp.controller('searchController', searchController);

    sdkApp.service('pageService', pageService);
    sdkApp.service('taskService', taskService);
    sdkApp.service('errorService', errorService);
    sdkApp.service('searchService', searchService);

    sdkApp.directive('searchResult', searchResultDirective);

    angular.element(document).ready(function() {
        angular.bootstrap(angular.element('[data-sdk-app]'), ['sdk']);
    });


    //Debugging for ui.router state issues
    // app.run(($rootScope) => {
    //     $rootScope.$on("$stateChangeError", console.log.bind(console));
    // });

    return sdkApp;

});
