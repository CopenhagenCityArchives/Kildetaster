define([

    'angular',
    'clipboard'

], function(ang, Clipboard) {

    var shareLinkDirective = /*@ngInject*/ function shareLinkDirective(SEARCH_PERMALINK_URL) {

        return {

            restrict: 'E',
            replace: true,

            scope: {
                label: '=',
                shareLink: '=?',
                buttonText: '=?',
                shareLinkId: '=?'
            },

            templateUrl: 'shared/directives/shareLink.directive.tpl.html',

            link: function(scope, element, attrs) {
                //Build unique id
                scope.id = new Date().getTime();
                scope.shareLink = scope.shareLinkId ? SEARCH_PERMALINK_URL + scope.shareLinkId : scope.shareLink;
                scope.buttonText = scope.buttonText || 'Del';

                new Clipboard('#shareLink_' + scope.id + '_btn');

            }
        };
    };

    return shareLinkDirective;

});
