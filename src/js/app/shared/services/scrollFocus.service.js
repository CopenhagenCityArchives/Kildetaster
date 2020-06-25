define([

    'jquery'

], function($) {
    var scrollFocusService = ['$anchorScroll', function($anchorScroll) {
        return {
            scrollTo: function(id) {
                $anchorScroll(id);
                console.log('#'+id);
                $('#' +id).focus();
            }
        }
    }]
    return scrollFocusService;
});