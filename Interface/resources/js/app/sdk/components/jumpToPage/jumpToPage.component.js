define([
    
    './jumpToPage.controller',

], function(controller) {
    
    return {
        bindings: {
            changePage: '&'
        },
        templateUrl: 'sdk/components/jumpToPage/jumpToPage.component.tpl.html',
        controller: controller
    };

});
