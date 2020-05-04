define([

    'app/sdk/search/search-results/search-result.controller',

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
        template: '<tr tabindex="0" ng-click="$ctrl.goToPost()" ng-include="$ctrl.templateUrl"></tr>',
        controller: controller
    };

});