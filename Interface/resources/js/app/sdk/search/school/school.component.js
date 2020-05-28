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
        template: require('./school.component.tpl.html'),
        controller: controller
    };

});
