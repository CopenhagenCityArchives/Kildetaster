define([], function () {
    var searchConfigTextController = /*@ngInject*/ function searchConfigTextController() {

        var that = this;

        this.selectedCollections = null;

        this.$onInit = function () {
            that.selectedCollections = [];

            // Filter out all selected in the collection
            angular.forEach(this.collections, function(val, key) {
                if (val.selected) {
                    that.selectedCollections.push(val);
                }
            });
        }

    }
    return searchConfigTextController;
});
