define([

], function () {

    var fritekstSearchController = /*@ngInject*/ function fritekstSearchController($scope, $location) {
      
        $scope.searchUrl = 'http://localhost:1510/search.html';
        //http://localhost:1510/search.html#/?q1.f=freetext_store&q1.op=eq&q1.t=lars&sortField=lastname&sortDirection=asc&postsPrPage=10&collections=1,17
        $scope.search = function search() {

            var term = encodeURIComponent($scope.term);
            // Go to the search page and perform the search
            document.location.href = $scope.searchUrl + '#/?q1.f=freetext_store&q1.op=eq&q1.t=' + term +'&sortField=lastname&sortDirection=asc&postsPrPage=10&collections=1,17,18';
        } 
        
        $scope.init = function init(options) {
            //$scope.searchUrl = options.searchUrl;
        }
    };

    return fritekstSearchController;

});