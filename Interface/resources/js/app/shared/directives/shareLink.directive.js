define([

    'angular',
    'clipboard'

], function(ang, Clipboard) {

    var shareLinkDirective = /*@ngInject*/ function shareLinkDirective() {

        return {

            restrict: 'E',
            replace: true,

            scope: {
                label: '=',
                shareLink: '=',
                buttonText: '=?'
            },

            templateUrl: 'shared/directives/shareLink.directive.tpl.html',

            link: function(scope, element, attrs) {
                //Build unique id
                scope.id = new Date().getTime();

                scope.buttonText = scope.buttonText || 'Del';

                new Clipboard('#shareLink_' + scope.id + '_btn');

            }
        };
    };

    return shareLinkDirective;

});
