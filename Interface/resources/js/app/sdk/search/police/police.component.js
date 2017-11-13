define([
    
    'app/sdk/search/police/police.controller',

], function(controller) {
    
    return {
        bindings: {
            data: '<',
            errorReportingConfig: '<'
        },
        templateUrl: 'sdk/search/police/police.component.tpl.html',
        controller: controller
    };

});
