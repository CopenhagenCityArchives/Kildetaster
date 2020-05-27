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
        templateUrl: './erindring.component.tpl.html',
        controller: controller
    };

});
