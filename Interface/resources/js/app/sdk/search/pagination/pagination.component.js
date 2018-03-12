define([

    'app/sdk/search/pagination/pagination.controller',

], function (controller) {

    return {
        bindings: {
            currentPage: '<',
            results: '<',
            postsPrPage: '<',
            goToPage: '&'
        },
        templateUrl: 'sdk/search/pagination/pagination.component.tpl.html',
        controller: controller
    };

});