define([], function() {
    var searchResultController = /*@ngInject*/ function searchResultController($state) {

        var that = this;

        this.goToPost = function () {
            $state.go('search.page.result.data_page', {
                index: that.page * 10 + that.index,
                highlighting: that.highlighting
            });
        };
        
        this.$onInit = function() {

            if (this.result && this.result.jsonObj) {
                
                this.jsonData = JSON.parse(this.result.jsonObj);
                this.data = this.jsonData.data;
                this.highlighting = this.result.highlighting;

                //HACK START
                // takes the dateOfDeath from the data and overwrites the wrongfully formatted dateOfDeath in the jsonObj data
                //This should be removed when the API is updated to return the correct date format (a timestamp)
                this.data.dateOfDeath = this.result.dateOfDeath;
                //HACK END

                this.metadata = this.jsonData.metadata;

                if (this.metadata.collection_id == 1) {
                    this.templateUrl = 'sdk/search/search-results/burial.tpl.html';
                }
                else if (this.metadata.station) {
                    this.templateUrl = 'sdk/search/search-results/police.tpl.html'
                }
                else if (this.metadata.erindring_number) {
                    this.templateUrl = 'sdk/search/search-results/erindring.tpl.html'
                }
            }

        }
        

    }
    return searchResultController;
})