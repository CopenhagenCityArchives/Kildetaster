define([
    
    'app/sdk/search/erindring/erindring.controller',

], function(controller) {
    
    return {
        bindings: {
            data: '<',
            errorReportingConfig: '<',
            postErrors: '<',
            showErrorReports: '<',
            toggleErrorReports: '&'
        },
        templateUrl: 'sdk/search/erindring/erindring.component.tpl.html',
        controller: controller
    };

});
