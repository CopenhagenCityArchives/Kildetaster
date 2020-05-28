define([

    './navigation.controller',

], function (controller) {

    return {
        bindings: {
            searchData: '<'
        },
        template: require('./navigation.component.tpl.html'),
        controller: controller
    };

});