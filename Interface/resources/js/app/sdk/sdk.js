define([

    'angular',
    'app/shared/shared',

    'app/sdk/controllers/mypage.controller'

], function(

    ang,
    shared,

    mypageController
) {

    var sdkApp = angular.module('sdk', ['shared']);

    sdkApp.controller('mypageController', mypageController);


    angular.element(document).ready(function() {
        angular.bootstrap(angular.element('[data-sdk-app]'), ['sdk']);
    });


    //Debugging for ui.router state issues
    // app.run(($rootScope) => {
    //     $rootScope.$on("$stateChangeError", console.log.bind(console));
    // });

    return sdkApp;

});
