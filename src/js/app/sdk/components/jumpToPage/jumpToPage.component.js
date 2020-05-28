define([
    
    './jumpToPage.controller',

], function(controller) {
    
    return {
        bindings: {
            changePage: '&'
        },
        template: require('./jumpToPage.component.tpl.html'),
        controller: controller
    };

});
