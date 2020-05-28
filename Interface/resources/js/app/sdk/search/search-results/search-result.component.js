define([

    './search-result.controller',

], function (controller) {

    return {
        bindings: {
            result: '<',
            config: '<',
            //The index this posts is in, based on the current visibile results
            index: '<',
            //The page (in pagination) we are currently on
            page: '<'
        },
        template: '<div ng-click="$ctrl.goToPost()"></div>',
        controller: controller
    };

});