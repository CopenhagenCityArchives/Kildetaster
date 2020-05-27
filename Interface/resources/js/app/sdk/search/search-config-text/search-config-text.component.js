define([

    './search-config-text.controller',

], function (controller) {

    return {
        bindings: {
            config: '<',
            collections: '<'
        },
        transclude: true,
        templateUrl: './search-config-text.component.tpl.html',
        controller: controller
    };

});