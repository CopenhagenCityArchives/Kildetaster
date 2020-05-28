define([
    
    './police.controller',

], function(controller) {
    
    return {
        bindings: {
            openErrorReporting: '&',
            data: '<',
            postErrors: '<',
            showErrorReports: '<',
            toggleErrorReports: '&'
        },
        template: require('./police.component.tpl.html'),
        controller: controller
    };

});
