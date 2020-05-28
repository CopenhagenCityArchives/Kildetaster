define([

    './search-config-text.controller',

], function (controller) {

    return {
        bindings: {
            config: '<',
            collections: '<'
        },
        transclude: true,
        template: require('./search-config-text.component.tpl.html'),
        controller: controller
    };

});