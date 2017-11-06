define([

    'app/sdk/search/post/post.controller',

], function (controller) {

    return {
        bindings: {
            json: '<'
        },
        templateUrl: 'sdk/search/post/post.component.tpl.html',
        controller: controller
    };

});
