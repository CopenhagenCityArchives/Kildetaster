define([], function () {

    var postController = function postController(searchService) {

        var that = this;

        this.$onInit = function () {
            searchService.getConfigPromise().then(function(response) {
                return response;
            })
            .then(function(config) {
                return searchService.getSearch(config);
            })
            .then(function(response) {
                console.log('res', response);
            })
            .catch(function(err) {
                console.log('Error: ', err);
            })
            
        };

    };

    return postController;
});