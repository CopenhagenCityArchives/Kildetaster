define([], function () {

    var paginationController = /*@ngInject*/ function paginationController() {

        var that = this;

        that.pagination = [];
        that.total = null;

        this.goToFirst = function goToFirst() {
            if (that.currentPage !== 0) {
                that.goToPage({ page: 0 })
            } 
        };

        this.goToLast = function goToLast() {
            if (that.currentPage !== that.total - 1) {
                that.goToPage({ page: that.total - 1 })
            }
        };

        this.prev = function prev() {
            if (that.currentPage !== 0) {
                that.goToPage({ page: that.currentPage - 1 })
            }
        };

        this.next = function next() {
            if (that.currentPage !== that.total - 1) {
                that.goToPage({ page: that.currentPage + 1 })
            }

        };

        this.buildPagination = function buildPagination() {

            var arr = [],
                numPages = Math.ceil(that.results.numFound / that.postsPrPage),
                maxPages = numPages > 5 ? 5 : numPages;
            
            that.total = numPages;
           
            // We are on one of the first three pages
            if (that.currentPage < 3) {
                for (var i = 0; maxPages > i; i++) {
                    arr.push({ label: i + 1, page: i });
                }
            }
            // We are on one of the last three pages
            else if (that.total - that.currentPage < (maxPages - 2)) {
                for (var i = maxPages; 0 < i; i--) {
                    arr.push({ label: (that.total - i) + 1, page: that.total - i });
                }
            }
            // Everything in between
            else {
                var maxPageNumber = that.currentPage + 3,
                    firstPageNumber = that.currentPage - 2;

                for (var i = firstPageNumber; i < maxPageNumber; i++) {
                    arr.push({ label: i + 1, page: i});
                }
            }

            that.pagination = arr;     
        }

        this.$onInit = function () {
            that.buildPagination();
        }

        this.$onChanges = function(changes) {
            that.buildPagination();
        }

    }
    return paginationController;
})