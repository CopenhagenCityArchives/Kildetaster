define([
    
    'app/sdk/components/numPages/numPages.controller',

], function(controller) {
    
    return {
        bindings: {
            selected: '<',
            changeCount: '&'
        },
        templateUrl: 'sdk/components/numPages/numPages.component.tpl.html',
        controller: controller
    };

});
