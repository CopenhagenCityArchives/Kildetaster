define([

    './school.controller',

], function(controller) {

    return {
        bindings: {
            openErrorReporting: '&',
            data: '<',
            postErrors: '<',
            showErrorReports: '<',
            toggleErrorReports: '&'
        },
        templateUrl: './school.component.tpl.html',
        controller: controller
    };

});
