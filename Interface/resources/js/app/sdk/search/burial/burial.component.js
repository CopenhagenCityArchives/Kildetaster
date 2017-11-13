define([
    
    'app/sdk/search/burial/burial.controller',

], function(controller) {
    
    return {
        bindings: {
            data: '<',
            errorReportingConfig: '<'
        },
        templateUrl: 'sdk/search/burial/burial.component.tpl.html',
        controller: controller
    };

});
