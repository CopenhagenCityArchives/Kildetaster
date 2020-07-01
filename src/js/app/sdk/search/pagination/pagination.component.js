define([

    './pagination.controller',

], function (controller) {

    return {
        bindings: {
            currentPage: '<',
            numFound: '<',
            postsPrPage: '<',
            goToPage: '&',
            label: '@'
        },
        template: require('./pagination.component.tpl.html'),
        controller: controller
    };

});