define([

    './pagination.controller',

], function (controller) {

    return {
        bindings: {
            currentPage: '<',
            results: '<',
            postsPrPage: '<',
            goToPage: '&'
        },
        template: require('./pagination.component.tpl.html'),
        controller: controller
    };

});