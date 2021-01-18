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
        template: require('./efterretning.component.tpl.html'),
        controller: controller
    };

});
