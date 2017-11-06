define([

    'app/sdk/search/navigation/navigation.controller',

], function (controller) {

    return {
        bindings: {
            searchData: '<'
        },
        templateUrl: 'sdk/search/navigation/navigation.component.tpl.html',
        controller: controller
    };

});