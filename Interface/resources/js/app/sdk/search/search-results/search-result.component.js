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
        template: '<div ng-click="$ctrl.goToPost()" ng-include="$ctrl.templateUrl"></div>',
        controller: controller
    };

});