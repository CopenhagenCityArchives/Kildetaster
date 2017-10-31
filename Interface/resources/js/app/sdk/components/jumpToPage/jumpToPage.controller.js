define([], function() {

    var jumpToPageController = function jumpToPageController() {

        var that = this;

        that.page = 10;

        that.callParent = function callParent(page) {
            // Because page is 0 based in the parent
            that.changePage({page: parseInt(page) - 1 });
        }

    };

    return jumpToPageController;
});