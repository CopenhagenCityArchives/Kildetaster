define([
    
    'app/sdk/search/police/police.controller',

], function(controller) {
    
    return {
        bindings: {
            data: '<'
        },
        templateUrl: 'sdk/search/police/police.component.tpl.html',
        controller: controller
    };

});
