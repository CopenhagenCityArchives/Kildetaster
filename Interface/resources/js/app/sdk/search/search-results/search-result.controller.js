define([], function() {
    var searchResultController = /*@ngInject*/ function searchResultController($state) {

        var that = this;

        this.goToPost = function () {
            $state.go('search.page.result.post', {
                postId: that.data.id
            });
        };
        
        this.$onInit = function() {

            if (this.result && this.result.jsonObj) {
                
                this.data = JSON.parse(this.result.jsonObj);
               
                this.highlighting = this.result.highlighting;

                //HACK START
                // takes the dateOfDeath from the data and overwrites the wrongfully formatted dateOfDeath in the jsonObj data
                //This should be removed when the API is updated to return the correct date format (a timestamp)
                this.data.dateOfDeath = this.result.dateOfDeath;
                //HACK END

                if (this.data.collection_id == 1) {
                    this.templateUrl = 'sdk/search/search-results/burial.tpl.html';
                }
                else if (this.data.station) {
                    this.templateUrl = 'sdk/search/search-results/police.tpl.html'
                }
                else if (this.data.erindring_number) {
                    this.templateUrl = 'sdk/search/search-results/erindring.tpl.html'
                }
            }

        }
        

    }
    return searchResultController;
})