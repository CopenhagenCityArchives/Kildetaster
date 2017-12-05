define([

    'angular',

    'moment',

    'ngstorage',
    'angular-sanitize',

    'angular-ui-router',
    'angular-ui-select',
    'angular-filter',
    'angular-animate',

    'app/shared/sdk-templates',

    'app/shared/services/search.service',
    'app/shared/services/solr.service',
    'app/shared/services/error.service',
    'app/shared/services/helpers.service',
    'app/shared/services/token.service',
    'app/shared/services/user.service',

    'app/shared/services/token.factory',

    'app/sdk/search/search.config',
    'app/sdk/search/search.run',

    'app/sdk/search/search.controller',
    'app/sdk/search/search.results.controller',

    'app/sdk/search/error-report/error-report.controller',

    'app/sdk/directives/datapost-erindring.directive',

    'app/sdk/directives/postfield.directive',
    'app/sdk/directives/postCategory.directive',
    'app/sdk/directives/zoom-image.directive',
    'app/sdk/directives/pagination.directive',
    'app/sdk/directives/post-count.directive',

    'app/sdk/directives/term-field.directive',
    'app/sdk/directives/term-field-date.directive',

    'app/sdk/directives/format-input.directive',
    'app/sdk/directives/format-date.directive',

    'app/sdk/directives/text-name.directive',
    'app/sdk/directives/text-date.directive',
    'app/sdk/directives/text-position.directive',
    'app/sdk/directives/text-address.directive',
    'app/sdk/directives/text-deathcause.directive',
    'app/sdk/directives/text-age.directive',
    'app/sdk/directives/text-person-name.directive',
    'app/sdk/directives/text-address-police.directive',
    'app/sdk/directives/text-gender.directive',

    'app/sdk/directives/filterLink/filterLink.directive',
    'app/sdk/directives/facet/facet.directive',

    'app/sdk/search/getDomContent/getDomContent.directive',

    'app/sdk/components/jumpToPage/jumpToPage.component',
    'app/sdk/components/numPages/numPages.component',

    'app/sdk/search/search-results/search-result.component',
    'app/sdk/search/search-config-text/search-config-text.component',

    'app/sdk/search/post/post.component',
    'app/sdk/search/navigation/navigation.component',
    'app/sdk/search/police/police.component',
    'app/sdk/search/burial/burial.component',
    'app/sdk/search/erindring/erindring.component',

    'app/sdk/filters/formatStringNumber.filter',
    'app/shared/constants'

], function(

    ang,

    moment,

    ngStorage,
    ngSanitize,

    uiRouter,
    uiSelect,
    angularFilter,
    angularAnimate,

    sdkTemplates,

    searchService,
    solrService,
    errorService,
    helpersService,
    tokenService,
    userService,

    tokenFactory,

    searchConfig,
    searchRun,

    searchController,
    searchResultsController,

    errorReportController,

    datapostErindringDirective,

    postfieldDirective,
    postCategoryDirective,

    zoomImageDirective,
    paginationDirective,
    postCountDirective,

    termFieldDirective,
    termFieldDateDirective,

    formatInputDirective,
    formatDateDirective,

    textNameDirective,
    textDateDirective,
    textPositionDirective,
    textAddressDirective,
    textDeathcauseDirective,
    textAgeDirective,
    textPersonNameDirective,
    textAddressPoliceDirective,
    textGenderDirective,

    filterLinkDirective,
    facetDirective,

    getDomContentDirective,

    jumpToPageComponent,
    numPagesComponent,

    searchResultComponent,
    searchConfigTextComponent,

    postComponent,
    navigationComponent,
    postPoliceComponent,
    postBurialComponent,
    postErindringComponent,

    formatStringNumberFilter,

    constants

    ) {

    moment.locale('da');
    window.moment = moment;

    var searchApp = angular.module('search', [
        'sdk-templates',
        'constants',
        'ui.router',
        'ui.select',
        'angular.filter',
        'ngStorage',
        'ngSanitize',
        'ngAnimate'
    ]);

    searchApp.config(searchConfig);
    searchApp.run(searchRun);

    searchApp.service('searchService', searchService);
    searchApp.service('solrService', solrService);
    searchApp.service('errorService', errorService);
    searchApp.service('helpers', helpersService);
    searchApp.service('tokenService', tokenService);
    searchApp.service('userService', userService);

    searchApp.factory('tokenFactory', tokenFactory);

    searchApp.controller('searchController', searchController);
    searchApp.controller('searchResultsController', searchResultsController);
    
    searchApp.controller('errorReportController', errorReportController);

    // TODO remove when new version is done
    searchApp.directive('datapostErindring', datapostErindringDirective);
    
    searchApp.directive('postField', postfieldDirective);
    searchApp.directive('postCategory', postCategoryDirective);

    searchApp.directive('zoomImage', zoomImageDirective);
    searchApp.directive('pagination', paginationDirective);
    searchApp.directive('postCount', postCountDirective);

    searchApp.directive('termField', termFieldDirective);
    searchApp.directive('termFieldDate', termFieldDateDirective);

    searchApp.directive('formatInput', formatInputDirective);
    searchApp.directive('formatDate', formatDateDirective);

    searchApp.directive('textName', textNameDirective);
    searchApp.directive('textDate', textDateDirective);
    searchApp.directive('textPosition', textPositionDirective);
    searchApp.directive('textAddress', textAddressDirective);
    searchApp.directive('textDeathcause', textDeathcauseDirective);
    searchApp.directive('textAge', textAgeDirective);
    searchApp.directive('textPersonName', textPersonNameDirective);
    searchApp.directive('textAddressPolice', textAddressPoliceDirective);
    searchApp.directive('textGender', textGenderDirective);

    searchApp.directive('filterLink', filterLinkDirective);
    searchApp.directive('facet', facetDirective);

    searchApp.directive('getDomContent', getDomContentDirective);

    searchApp.component('jumpToPage', jumpToPageComponent);
    searchApp.component('numPages', numPagesComponent);

    // Search results
    searchApp.component('searchResult', searchResultComponent);
    searchApp.component('searchConfigText', searchConfigTextComponent);

    searchApp.component('post', postComponent);
    searchApp.component('navigation', navigationComponent);
    searchApp.component('postPolice', postPoliceComponent);
    searchApp.component('postBurial', postBurialComponent);
    searchApp.component('postErindring', postErindringComponent);

    searchApp.filter('formatStringNumber', formatStringNumberFilter);

    return searchApp;
});
