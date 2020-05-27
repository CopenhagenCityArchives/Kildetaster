define([
    
    './numPages.controller',

], function(controller) {
    
    return {
        bindings: {
            selected: '<',
            changeCount: '&'
        },
        templateUrl: './numPages.component.tpl.html',
        controller: controller
    };

});
