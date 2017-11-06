define([], function() {
    var navigationController = /*@ngInject*/ function navigationController($state, $stateParams) {

        var that = this;
        
        this.numFound = null;

        this.partOfSearch = null;

        this.disableNext = function () {
            return that.currentIndex >= that.numFound - 1;
        };

        this.disablePrev = function () {
            return that.currentIndex === 0;
        };

        this.next = function () {

            var nextPost = that.searchData.response.docs[that.currentIndex +1];

            if (nextPost) {
                $state.go('.', {
                    postId: nextPost.id
                });
            }
            else {
                console.log('getting more stuffs!')
            }
            
        };

        this.prev = function () {
            
            var prevPost = that.searchData.response.docs[that.currentIndex - 1];
            
            $state.go('.', {
                postId: prevPost.id
            });
        };
       
        this.$onInit = function() {

            if (that.searchData) {
                that.currentIndex = that.searchData.response.docs.findIndex(function (post) {
                    return post.id === $stateParams.postId;
                });

                if (that.searchData) {
                    that.numFound = that.searchData.response.numFound;

                    //Indicates if we initialized as part of a search query, if no numFound is set, assume that the page was hit directly
                    that.partOfSearch = that.searchData.response.numFound !== undefined;
                }
            }
            

        }

    }
    return navigationController;
})