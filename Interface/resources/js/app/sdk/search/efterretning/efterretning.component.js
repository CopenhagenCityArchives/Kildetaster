define([

    'app/sdk/search/efterretning/efterretning.controller',

], function(controller) {

    return {
        bindings: {
            openErrorReporting: '&',
            data: '<',
            postErrors: '<',
            showErrorReports: '<',
            toggleErrorReports: '&'
        },
        templateUrl: 'sdk/search/efterretning/efterretning.component.tpl.html',
        controller: controller
    };

});
