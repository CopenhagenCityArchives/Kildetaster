define([

    './navigation.controller',

], function (controller) {

    return {
        bindings: {
            searchData: '<',
            data: '<'
        },
        template: require('./navigation.component.tpl.html'),
        controller: controller
    };

});