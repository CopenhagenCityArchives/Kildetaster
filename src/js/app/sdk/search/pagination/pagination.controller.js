define([], function () {

    var paginationController = function paginationController() {

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
            var pagination = [];

            that.total = Math.ceil(that.results.numFound / that.postsPrPage);
            
            var startPage = that.currentPage - 2;
            var endPage = that.currentPage + 2;

            if (startPage < 0) {
                endPage -= startPage;
                startPage = 0;
            }

            if (endPage > that.total - 1) {
                if (startPage - (endPage - (that.total - 1)) > 0) {
                    startPage -= endPage - (that.total - 1);
                }
                endPage = that.total - 1;
            }
            
            for (let i = startPage; i <= endPage; i++) {
                pagination.push({ label: i + 1, page: i });
            }

            that.pagination = pagination;
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