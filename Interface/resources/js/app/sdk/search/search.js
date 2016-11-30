define([

    'angular',

    'ngstorage',

    'angular-ui-router',
    'angular-filter',

    'app/shared/sdk-templates',

    'app/shared/services/search.service',
    'app/shared/services/error.service',
    'app/shared/services/helpers.service',
    'app/shared/services/token.service',
    'app/shared/services/user.service',

    'app/shared/services/token.factory',

    'app/sdk/search/search.config',
    'app/sdk/search/search.run',

    'app/sdk/search/search.controller',
    'app/sdk/search/search.facets.controller',

    'app/sdk/search/navigation.controller',
    'app/sdk/search/post.controller',

    'app/sdk/directives/searchresult.directive',
    'app/sdk/directives/postfield.directive',
    'app/sdk/directives/zoom-image.directive',
    'app/sdk/directives/pagination.directive',

    'app/shared/constants'

], function(

    ang,

    ngStorage,

    uiRouter,
    angularFilter,

    sdkTemplates,

    searchService,
    errorService,
    helpersService,
    tokenService,
    userService,

    tokenFactory,

    searchConfig,
    searchRun,

    searchController,
    searchFacetsController,
    navigationController,
    postController,

    searchResultDirective,
    postfieldDirective,

    zoomImageDirective,
    paginationDirective,

    constants

    ) {


    var searchApp = angular.module('search', ['sdk-templates', 'constants', 'ui.router', 'angular.filter', 'ngStorage']);

    searchApp.config(searchConfig);
    searchApp.run(searchRun);

    searchApp.service('searchService', searchService);
    searchApp.service('errorService', errorService);
    searchApp.service('helpers', helpersService);
    searchApp.service('tokenService', tokenService);
    searchApp.service('userService', userService);

    searchApp.factory('tokenFactory', tokenFactory);

    searchApp.controller('searchController', searchController);
    searchApp.controller('searchFacetsController', searchFacetsController);
    searchApp.controller('navigationController', navigationController);
    searchApp.controller('postController', postController);

    searchApp.directive('searchResult', searchResultDirective);
    searchApp.directive('postField', postfieldDirective);

    searchApp.directive('zoomImage', zoomImageDirective);
    searchApp.directive('pagination', paginationDirective);

    angular.element(document).ready(function() {
        angular.bootstrap(angular.element('[data-sdk-search-app]'), ['search']);
    });



    //Debugging for ui.router state issues, fails when Uglifying because of the => operator
    // searchApp.run(($rootScope) => {
    //     $rootScope.$on("$stateChangeError", console.log.bind(console));
    // });

    return searchApp;
});
