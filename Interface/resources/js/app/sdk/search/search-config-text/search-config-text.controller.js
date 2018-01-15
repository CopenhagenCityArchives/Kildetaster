define([], function () {
    var searchConfigTextController = /*@ngInject*/ function searchConfigTextController($filter) {

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

            angular.forEach(this.config, function(val, key){
                if(val.field.type == "date"){
                    val.converted_term = $filter('date')(val.term, 'dd-MM-yyyy');
                }
            });
        }

    }
    return searchConfigTextController;
});
