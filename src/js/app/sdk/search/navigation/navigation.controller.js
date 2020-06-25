define([], function() {
    
    var navigationController = [
        '$state', 
        '$stateParams',
        '$anchorScroll',
        'searchService',
        'solrService',
        'scrollFocusService',
        function navigationController(
            $state, 
            $stateParams,
            $anchorScroll,
            searchService,
            solrService,
            scrollFocusService,
        ) {

        var that = this;
        
        this.numFound = null;

        this.partOfSearch = null;

        this.disableNext = function () {
            return that.index >= that.numFound;
        };

        this.disablePrev = function () {
            return that.index  === 1;
        };

        this.next = function () {

            var nextPost = that.searchData.response.docs[that.currentIndex + 1];

            // We still have data in the existing search results
            if (nextPost) {
                $state.go('.', {
                    postId: nextPost.id
                });
            }
            // We have reached the end, fetch the next page of data
            else {
                
                var conf = searchService.currentSearch;
               
                // Clear existing search result data
                solrService.clearSearchData();
                // Fetch new results
                solrService.search(
                    conf.queries,
                    conf.filterQueries,
                    conf.collections,
                    conf.sortField,
                    conf.sortDirection,
                    that.index,
                    conf.postsPrPage
                ).then(function(response) {
                    
                    searchService.currentSearch.page++;

                    var firstPost = response.response.docs[0];

                    $state.go('.', {
                        postId: firstPost.id
                    });
                });
            }
            
        };

        this.prev = function () {

            var conf, nextIndex,
                prevPost = that.searchData.response.docs[that.currentIndex - 1];
            
            // We have the next post in the current search results
            if (prevPost) {
                
                $state.go('.', {
                    postId: prevPost.id
                });
            }
            // We need to fetch the next batch of results
            else {
               
                conf = searchService.currentSearch;
                nextIndex = conf.postsPrPage * (conf.page - 1);

                // Clear existing search result data
                solrService.clearSearchData();
                
                // Fetch new results
                solrService.search(
                    conf.queries,
                    conf.filterQueries,
                    conf.collections,
                    conf.sortField,
                    conf.sortDirection,
                    nextIndex,
                    conf.postsPrPage
                ).then(function (response) {
                    
                    var docs = response.response.docs;
                    // Get the last post in the set
                    var lastPost = docs[docs.length - 1];

                    // Update current page indicator
                    searchService.currentSearch.page--;

                    // Navigate to post
                    $state.go('.', {
                        postId: lastPost.id
                    });

                });
            }
        };

        this.jumpTo = function() {
            
            scrollFocusService.scrollTo('permalink_btn');
            //$anchorScroll('post-start');
        }
       
        this.$onInit = function() {

            $anchorScroll('nav-start');

            if (that.searchData) {
                // Get the index in the current result data
                that.currentIndex = that.searchData.response.docs.findIndex(function (post) {
                    return post.id === $stateParams.postId;
                });

                // Readable indicator to show to the user, the index of the current post in the entire current search
                that.index = that.currentIndex + 1 + (searchService.currentSearch.postsPrPage * searchService.currentSearch.page);

                // Set the total number of hits
                that.numFound = that.searchData.response.numFound;

                //Indicates if we initialized as part of a search query, if no numFound is set, assume that the page was hit directly
                that.partOfSearch = that.searchData.response.numFound !== undefined;
          
            }
        }
    }];

    return navigationController;
})