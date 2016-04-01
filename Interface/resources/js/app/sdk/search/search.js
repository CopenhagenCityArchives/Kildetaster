define([

    'angular',

    'angular-ui-router',
    'angular-filter',

    'app/shared/sdk-templates',

    'app/shared/services/search.service',
    'app/shared/services/error.service',
    'app/shared/services/helpers.service',

    'app/sdk/search/search.config',
    'app/sdk/search/search.run',

    'app/sdk/search/search.controller',
    'app/sdk/search/search.facets.controller',

    'app/sdk/search/navigation.controller',
    'app/sdk/search/post.controller',

    'app/sdk/directives/searchresult.directive',
    'app/sdk/directives/postfield.directive',

    'app/shared/constants'

], function(
    
    ang,

    uiRouter,
    angularFilter,

    sdkTemplates,

    searchService,
    errorService,
    helpersService,

    searchConfig,
    searchRun,

    searchController,
    searchFacetsController,
    navigationController,
    postController,

    searchResultDirective,
    postfieldDirective,

    constants
    
    ) {


    var searchApp = angular.module('search', ['sdk-templates', 'constants', 'ui.router', 'angular.filter']);

    searchApp.config(searchConfig);
    searchApp.run(searchRun);

    searchApp.service('searchService', searchService);
    searchApp.service('errorService', errorService);
    searchApp.service('helpers', helpersService);

    searchApp.controller('searchController', searchController);
    searchApp.controller('searchController', searchController);
    searchApp.controller('searchController', searchController);
    searchApp.controller('searchFacetsController', searchFacetsController);
    searchApp.controller('navigationController', navigationController);
    searchApp.controller('postController', postController);

    searchApp.directive('searchResult', searchResultDirective);
    searchApp.directive('postField', postfieldDirective);

    angular.element(document).ready(function() {
        angular.bootstrap(angular.element('[data-sdk-search-app]'), ['search']);
    });

    

    //Debugging for ui.router state issues, fails when Uglifying because of the => operator
    // searchApp.run(($rootScope) => {
    //     $rootScope.$on("$stateChangeError", console.log.bind(console));
    // });

    return searchApp;
});