define([

    'angular',

    'app/shared/sdk-templates',

    'app/sdk/sdk.run',

    'app/sdk/search/search',

    'app/sdk/controllers/mypage.controller',
    'app/sdk/controllers/opentasks.controller',
    'app/sdk/controllers/errors.controller',
    
    'app/shared/services/page.service',
    'app/shared/services/task.service',
    'app/shared/services/error.service',

    'app/sdk/directives/searchresult.directive',

    'app/shared/constants'


], function(

    ang,

    sdkTemplates,
    
    run,

    searchApp,
    
    mypageController,
    opentasksController,
    errorsController,

    pageService,
    taskService,
    errorService,
    
    constants
) {

    var sdkApp = angular.module('sdk', ['sdk-templates', 'search', 'constants']);

    sdkApp.run(run);

    sdkApp.controller('mypageController', mypageController);
    sdkApp.controller('opentasksController', opentasksController);
    sdkApp.controller('errorsController', errorsController);

    sdkApp.service('pageService', pageService);
    sdkApp.service('taskService', taskService);
    sdkApp.service('errorService', errorService);

    angular.element(document).ready(function() {
        angular.bootstrap(angular.element('[data-sdk-app]'), ['sdk']);
    });


    //Debugging for ui.router state issues
    // app.run(($rootScope) => {
    //     $rootScope.$on("$stateChangeError", console.log.bind(console));
    // });

    return sdkApp;

});
