define([
    
    './erindring.controller',

], function(controller) {
    
    return {
        bindings: {
            openErrorReporting: '&',
            data: '<',
            postErrors: '<',
            showErrorReports: '<',
            toggleErrorReports: '&'
        },
        template: require('./erindring.component.tpl.html'),
        controller: controller
    };

});
