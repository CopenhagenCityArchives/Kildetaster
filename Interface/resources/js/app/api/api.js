define([

    'angular',
    'app/shared/shared',

    'app/api/controllers/mypage.controller'

], function(

    ang,
    shared,

    mypageController
) {

    var apiApp = angular.module('api', ['shared']);

    apiApp.controller('mypageController', mypageController);
    


    angular.element(document).ready(function() {
        angular.bootstrap(angular.element('[data-api-app]'), ['api']);
    });


    //Debugging for ui.router state issues
    // app.run(($rootScope) => {
    //     $rootScope.$on("$stateChangeError", console.log.bind(console));
    // });

    return apiApp;

});
