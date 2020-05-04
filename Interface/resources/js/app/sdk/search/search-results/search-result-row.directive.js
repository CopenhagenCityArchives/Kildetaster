define([], function () {
    var searchResultRowDirective = /*@ngInject*/ function ($compile) {
        return {
            restrict: 'A',
            scope: {
                index: '<',
                result: '<',
                config: '<',
                page: '<'
            },
            controller: ['$scope', function($scope) {
                $scope.data = JSON.parse($scope.result.jsonObj);
                $scope.highlighting = $scope.result.highlighting;

                $scope.type = null;
                switch ($scope.result.collection_id) {
                    case 1:
                        $scope.type = 'burial';
                        break;
                    case 17:
                        $scope.type = 'police';
                        break;
                    case 18:
                        $scope.type = 'erindring';
                        break;
                    case 19:
                        $scope.type = 'efterretning';
                        break;
                    case 100:
                        $scope.type = 'school';
                        break;
                    default:
                        break;
                }
            }],
            templateUrl: 'sdk/search/search-results/search-result.tpl.html'
        }
    };

    return searchResultRowDirective;
});