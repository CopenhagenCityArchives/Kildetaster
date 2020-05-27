define([

    './post.controller',

], function (controller) {

    return {
        bindings: {
            // From route resolve
            userData: '<',
            data: '<',
            errorReportingConfig: '<'
        },
        templateUrl: './post.component.tpl.html',
        controller: controller
    };

});
