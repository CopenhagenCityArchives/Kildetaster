define([
    
    './burial.controller',

], function(controller) {
    
    return {
        bindings: {
            userData: '<',
            openErrorReporting: '&',
            data: '<',
            postErrors: '<',
            showErrorReports: '<',
            toggleErrorReports: '&'
        },
        template: require('./burial.component.tpl.html'),
        controller: controller
    };

});
