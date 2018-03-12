define([

], function () {

    var fritekstSearchController = /*@ngInject*/ function fritekstSearchController($scope, $location) {

        $scope.search = function search() {

            var term = encodeURIComponent($scope.term);
            // Go to the search page and perform the search

            document.location.href = $scope.searchUrl + '#/results?q1.f=freetext_store&q1.op=in_multivalued&q1.t=' + term + '&sortField=lastname&sortDirection=asc&postsPrPage=10&collections=1,17,18';
        }

        $scope.init = function init(options) {
            // Set url to search page
            $scope.searchUrl = options.searchUrl;
        }
    };

    return fritekstSearchController;

});
