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
        template: '<tr tabindex="0" ng-click="$ctrl.goToPost()"></tr>',
        controller: controller
    };

});