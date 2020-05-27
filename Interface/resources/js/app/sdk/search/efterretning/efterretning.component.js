define([

    './efterretning.controller',

], function(controller) {

    return {
        bindings: {
            openErrorReporting: '&',
            data: '<',
            postErrors: '<',
            showErrorReports: '<',
            toggleErrorReports: '&'
        },
        templateUrl: './efterretning.component.tpl.html',
        controller: controller
    };

});
