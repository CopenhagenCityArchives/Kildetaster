define([

    'angular',
    'app/shared/shared',
    'app/shared/sdk-templates',

    'angular-bootstrap',

    'app/sdk/controllers/mypage.controller',
    'app/sdk/controllers/opentasks.controller',
    'app/sdk/controllers/errors.controller',

    'app/sdk/sdk.run'

], function(

    ang,
    shared,
    sdkTemplates,

    angularBootstrap,

    mypageController,
    opentasksController,
    errorsController,

    run
) {

    var sdkApp = angular.module('sdk', ['shared', 'sdk-templates', 'ui.bootstrap']);

    sdkApp.controller('mypageController', mypageController);
    sdkApp.controller('opentasksController', opentasksController);
    sdkApp.controller('errorsController', errorsController);

    sdkApp.run(run);

    angular.element(document).ready(function() {
        angular.bootstrap(angular.element('[data-sdk-app]'), ['sdk']);
    });


    //Debugging for ui.router state issues
    // app.run(($rootScope) => {
    //     $rootScope.$on("$stateChangeError", console.log.bind(console));
    // });

    return sdkApp;

});
