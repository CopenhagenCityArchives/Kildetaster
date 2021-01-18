define([

], function () {

    /**
     * Based on a string, grab the dom node with the id that match the string, and use it as the
     * content of the elmement this directive runs on
     */
    var getDomContentDirective = function getDomContentDirective() {

        return {

            restrict: 'A',
            
            link: function (scope, element, attrs) {

                if (!attrs.getDomContent) {
                    console.error('getDomContentDirective without any target!');
                    return;
                }

                var content = jQuery('#' + attrs.getDomContent).html();

                if (!content) {
                    console.error('getDomContentDirtective with no content!');
                }
                element.html(content);
                
            }
        };
    };

    return getDomContentDirective;

});
