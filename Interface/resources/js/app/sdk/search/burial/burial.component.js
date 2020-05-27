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
        templateUrl: './burial.component.tpl.html',
        controller: controller
    };

});
