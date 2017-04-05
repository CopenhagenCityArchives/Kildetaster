define([

    'angular',

    'ngstorage',
    'angular-sanitize',

    'angular-ui-router',
    'angular-ui-select',
    'angularjs-datepicker',
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
    'app/sdk/directives/postCategory.directive',
    'app/sdk/directives/zoom-image.directive',
    'app/sdk/directives/pagination.directive',
    'app/sdk/directives/post-count.directive',

    'app/sdk/directives/term-field.directive',

    'app/sdk/directives/text-name.directive',
    'app/sdk/directives/text-date.directive',
    'app/sdk/directives/text-position.directive',
    'app/sdk/directives/text-address.directive',
    'app/sdk/directives/text-deathcause.directive',

    'app/shared/constants'

], function(

    ang,

    ngStorage,
    ngSanitize,

    uiRouter,
    uiSelect,
    datepicker,
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
    postCategoryDirective,

    zoomImageDirective,
    paginationDirective,
    postCountDirective,

    termFieldDirective,

    textNameDirective,
    textDateDirective,
    textPositionDirective,
    textAddressDirective,
    textDeathcauseDirective,

    constants

    ) {


    var searchApp = angular.module('search', [
        'sdk-templates',
        'constants',
        'ui.router',
        'ui.select',
        'angular.filter',
        'ngStorage',
        'ngSanitize',
        '720kb.datepicker'
    ]);

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
    searchApp.directive('postCategory', postCategoryDirective);

    searchApp.directive('zoomImage', zoomImageDirective);
    searchApp.directive('pagination', paginationDirective);
    searchApp.directive('postCount', postCountDirective);

    searchApp.directive('termField', termFieldDirective);

    searchApp.directive('textName', textNameDirective);
    searchApp.directive('textDate', textDateDirective);
    searchApp.directive('textPosition', textPositionDirective);
    searchApp.directive('textAddress', textAddressDirective);
    searchApp.directive('textDeathcause', textDeathcauseDirective);

    angular.element(document).ready(function() {
        angular.bootstrap(angular.element('[data-sdk-search-app]'), ['search']);
    });



    //Debugging for ui.router state issues, fails when Uglifying because of the => operator
    // searchApp.run(($rootScope) => {
    //     $rootScope.$on("$stateChangeError", console.log.bind(console));
    // });

    return searchApp;
});
