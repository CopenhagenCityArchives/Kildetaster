define([

    'angular',
    'app/shared/shared',
    'app/shared/sdk-templates',

    'angular-bootstrap',

    'app/sdk/controllers/mypage.controller',
    'app/sdk/controllers/opentasks.controller'

], function(

    ang,
    shared,
    sdkTemplates,

    angularBootstrap,

    mypageController,
    opentasksController
) {

    var sdkApp = angular.module('sdk', ['shared', 'sdk-templates', 'ui.bootstrap']);

    sdkApp.controller('mypageController', mypageController);
    sdkApp.controller('opentasksController', opentasksController);


    angular.element(document).ready(function() {
        angular.bootstrap(angular.element('[data-sdk-app]'), ['sdk']);
    });


    //Debugging for ui.router state issues
    // app.run(($rootScope) => {
    //     $rootScope.$on("$stateChangeError", console.log.bind(console));
    // });

    return sdkApp;

});
