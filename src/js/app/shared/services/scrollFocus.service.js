define([

    'jquery'

], function($) {
    var scrollFocusService = ['$anchorScroll', function($anchorScroll) {
        return {
            scrollTo: function(scroll_id, focus_id) {
                var offset = 180
                $anchorScroll.yOffset = offset;
                $('#' +focus_id).focus();
                $anchorScroll(scroll_id);
            }
        }
    }]
    return scrollFocusService;
});