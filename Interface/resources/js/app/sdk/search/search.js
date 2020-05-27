define([

    'angular',

    'moment',

    'ngstorage',
    'angular-sanitize',

    'angular-ui-router',
    'angular-ui-select',
    'angular-filter',
    'angular-animate',
    'angular-google-analytics',

    '../../shared/sdk-templates',

    '../../shared/services/search.service',
    '../../shared/services/solr.service',
    '../../shared/services/error.service',
    '../../shared/services/helpers.service',
    '../../shared/services/token.service',
    '../../shared/services/user.service',

    '../../shared/services/token.factory',

    './search.config',
    './search.run',

    './search.controller',
    './search.results.controller',

    './error-report/error-report.controller',

    '../directives/datapost-erindring.directive',

    '../directives/postfield.directive',
    '../directives/postCategory.directive',
    '../directives/zoom-image.directive',
    '../directives/post-count.directive',

    '../directives/term-field.directive',
    '../directives/term-field-date.directive',

    '../directives/format-input.directive',
    '../directives/format-date.directive',

    '../directives/text-name.directive',
    '../directives/text-date.directive',
    '../directives/text-position.directive',
    '../directives/text-address.directive',
    '../directives/text-deathcause.directive',
    '../directives/text-age.directive',
    '../directives/text-person-name.directive',
    '../directives/text-address-police.directive',
    '../directives/text-gender.directive',

    '../directives/filterLink/filterLink.directive',
    '../directives/facet/facet.directive',

    './getDomContent/getDomContent.directive',

    '../components/jumpToPage/jumpToPage.component',
    '../components/numPages/numPages.component',

    './search-results/search-result.component',
    './search-config-text/search-config-text.component',

    './post/post.component',
    './navigation/navigation.component',
    './pagination/pagination.component',
    './police/police.component',
    './burial/burial.component',
    './erindring/erindring.component',
    './efterretning/efterretning.component',
    './school/school.component',

    '../filters/formatStringNumber.filter',
    '../../shared/constants'

], function(

    ang,

    moment,

    ngStorage,
    ngSanitize,

    uiRouter,
    uiSelect,
    angularFilter,
    angularAnimate,
    angularGoogleAnalytics,

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
    paginationComponent,
    postPoliceComponent,
    postBurialComponent,
    postErindringComponent,
    postEfterretningComponent,
    postSchoolComponent,

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
    searchApp.component('pagination', paginationComponent);
    searchApp.component('postPolice', postPoliceComponent);
    searchApp.component('postBurial', postBurialComponent);
    searchApp.component('postErindring', postErindringComponent);
    searchApp.component('postEfterretning', postEfterretningComponent);
    searchApp.component('postSchool', postSchoolComponent);


    searchApp.filter('formatStringNumber', formatStringNumberFilter);

    return searchApp;
});
