define([

], function () {

    /**
     * Based on a string, grab the dom node with the id that match the string, and use it as the
     * content of the elmement this directive runs on
     */
    var getDomContentDirective = /*@ngInject*/ function getDomContentDirective() {

        return {

            restrict: 'A',
            
            link: function (scope, element, attrs) {
                var content = jQuery('#' + attrs.getDomContent).html();
                element.html(content);
                
            }
        };
    };

    return getDomContentDirective;

});
