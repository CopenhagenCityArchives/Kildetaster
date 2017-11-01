define([

    'app/sdk/search/search-config-text/search-config-text.controller',

], function (controller) {

    return {
        bindings: {
            config: '<',
            collections: '<'
        },
        templateUrl: 'sdk/search/search-config-text/search-config-text.component.tpl.html',
        controller: controller
    };

});