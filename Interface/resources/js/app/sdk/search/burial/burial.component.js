define([
    
    'app/sdk/search/burial/burial.controller',

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
        templateUrl: 'sdk/search/burial/burial.component.tpl.html',
        controller: controller
    };

});
