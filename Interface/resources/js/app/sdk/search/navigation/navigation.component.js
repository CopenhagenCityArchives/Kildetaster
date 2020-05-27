define([

    './navigation.controller',

], function (controller) {

    return {
        bindings: {
            searchData: '<'
        },
        templateUrl: './navigation.component.tpl.html',
        controller: controller
    };

});