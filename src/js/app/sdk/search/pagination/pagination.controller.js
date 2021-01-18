define([], function () {

    var paginationController = ['$element', function paginationController($element) {

        var that = this;

        that.pagination = [];
        that.total = null;

        this.goToPage = function(page) {
            that.goToPageFn({ page: page, button: 'page', element: $element })
        }

        this.prev = function prev() {
            if (that.currentPage !== 0) {
                that.goToPageFn({ page: that.currentPage - 1, button: 'prev', element: $element })
            }
        };

        this.next = function next() {
            if (that.currentPage !== that.total - 1) {
                that.goToPageFn({ page: that.currentPage + 1, button: 'next', element: $element })
            }
        };

        this.buildPagination = function buildPagination() {
            var pagination = [];

            that.total = Math.ceil(that.numFound / that.postsPrPage);
            
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

    }];
    
    return paginationController;
})