define([

    'app/sdk/search/school/school.controller',

], function(controller) {

    return {
        bindings: {
            userData: '<',
            openErrorReporting: '&',
            data: '<',
            postErrors: '<',
            showErrorReports: '<',
            toggleErrorReports: '&'
        },
        templateUrl: 'sdk/search/school/school.component.tpl.html',
        controller: controller
    };

});
