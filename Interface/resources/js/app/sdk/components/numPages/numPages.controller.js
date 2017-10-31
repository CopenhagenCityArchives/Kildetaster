define([], function() {

    var numPagesController = function numPagesController() {

        var that = this;

        that.options = [10, 20, 30, 40, 50, 60, 70];

        that.updateCount = function (updateCount) {
            console.log('update', that.selected);
           that.changeCount({count: that.selected });
        }

    };

    return numPagesController;
});