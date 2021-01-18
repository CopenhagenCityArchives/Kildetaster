define([
    
    './numPages.controller',

], function(controller) {
    
    return {
        bindings: {
            selected: '<',
            changeCount: '&'
        },
        template: require('./numPages.component.tpl.html'),
        controller: controller
    };

});
