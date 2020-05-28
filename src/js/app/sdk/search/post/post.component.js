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
        template: require('./post.component.tpl.html'),
        controller: controller
    };

});
