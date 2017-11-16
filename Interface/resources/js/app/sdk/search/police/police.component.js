define([
    
    'app/sdk/search/police/police.controller',

], function(controller) {
    
    return {
        bindings: {
            openErrorReporting: '&',
            data: '<',
            postErrors: '<',
            showErrorReports: '<',
            toggleErrorReports: '&'
        },
        templateUrl: 'sdk/search/police/police.component.tpl.html',
        controller: controller
    };

});
