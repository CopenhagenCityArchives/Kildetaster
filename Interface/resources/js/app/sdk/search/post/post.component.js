define([

    'app/sdk/search/post/post.controller',

], function (controller) {

    return {
        bindings: {
            // From route resolve
            userData: '<',
            data: '<',
            errorReportingConfig: '<'
        },
        templateUrl: 'sdk/search/post/post.component.tpl.html',
        controller: controller
    };

});
