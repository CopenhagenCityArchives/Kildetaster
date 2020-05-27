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
        templateUrl: './pagination.component.tpl.html',
        controller: controller
    };

});