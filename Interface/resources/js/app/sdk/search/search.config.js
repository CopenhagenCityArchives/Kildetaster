define([

], function() {

    var searchConfig = /*@ngInject*/ function searchConfig($stateProvider, $urlRouterProvider, $httpProvider) {

        //Include the interceptor that adds the Authoraztion bearer token if present in session storage
        //Needed for when requesting posts, and the user is logged in. Without it, the backend is not able to determine
        //if the user is allowed to edit the post
        $httpProvider.interceptors.push('tokenFactory');

        // For any unmatched url, redirect to /
        $urlRouterProvider.otherwise('/');

        // Now set up the states
        $stateProvider
            .state('search', {
                url: '/',
                abstract: true,
                views: {
                    '': {
                        templateUrl: 'sdk/search/search.main.tpl.html'
                    }
                }
            })
            .state('search.page', {
                //?search can contain a search configuration
                url: '',
                views: {
                    '': {
                        templateUrl: 'sdk/search/search.tpl.html',
                        controller: 'searchController as ctrl'
                    }
                },
                reloadOnSearch: false,
                resolve: {
                    searchConfig: ['searchService', '$q', function(searchService, $q) {
                        var deferred = $q.defer();

                        searchService.getConfigPromise()
                        .then(function(searchConfig) {
                            deferred.resolve(searchConfig);
                        })
                        .catch(function(err) {
                            deferred.reject(err);
                        });

                        return deferred.promise;
                    }]
                }
            })
            .state('search.page.result', {
                url: '',
                abstract: true,
                views: {
                    '@': {
                        templateUrl: 'sdk/search/search.post.tpl.html'
                    }
                }

            })
            .state('search.page.result.data_page', {
                url: 'data_post/{dataPostId}',
                views: {
                    'navigation': {
                        templateUrl: 'sdk/search/post.navigation.tpl.html',
                        controller: 'navigationController'
                    },
                    '': {
                        templateUrl: 'sdk/search/data-post.tpl.html',
                        controller: 'datapostController'
                    }
                },
                params: {
                    highlighting: {},
                    index: undefined
                },
                resolve: {
                    resultData: ['solrService', 'searchService', '$location', '$stateParams', '$q', function(solrService, searchService, $location, $stateParams, $q) {
                        var deferred = $q.defer();

                        // Entry with pagination
                        if (searchService.currentSearch || searchService.urlParamsExist()) {
                            if ($stateParams.index === undefined && $location.search().index) {
                                $stateParams.index = $location.search().index || 0;
                            } else {
                                $stateParams.index = $stateParams.index || 0;
                            }
                            $stateParams.index = parseInt($stateParams.index);

                            // Either use active search configuration, or if that is absent, URL parameters
                            searchService.getConfigPromise()
                            .then(function(searchConfig) {
                                searchService.currentSearch = searchService.currentSearch || searchService.getSearch(searchConfig);
                                solrService.paginatedSearch(searchService.currentSearch.queries, searchService.currentSearch.filterQueries, searchService.currentSearch.collections, searchService.currentSearch.sortField, searchService.currentSearch.sortDirection, $stateParams.index)
                                .then(function(results) {
                                    if (results && results.response && results.response.numFound > 0) {
                                        deferred.resolve(results.response);
                                    } else {
                                        deferred.reject("no results for page");
                                    }
                                })
                                .catch(function(err) {
                                    deferred.reject(err);
                                })
                            }).catch(function(err) {
                                deferred.reject(err);
                            });
                        // Entry without pagination
                        } else {
                            var queries = angular.copy(searchService.currentSearch.queries);
                            queries.push({
                                field: { name: 'id', type: 'string' },
                                operator: { op: 'eq' },
                                term: $stateParams.dataPostId
                            });
                            solrService.pageinatedSearch(queries, searchService.currentSearch.facets, searchService.currentSearch.collections, searchService.currentSearch.sortField, searchService.currentSearch.sortDirection, 0)
                            .then(function(results) {
                                deferred.resolve(results.respones);
                            }).catch(function(err) {
                                deferred.reject(err);
                            });
                        }

                        return deferred.promise;
                    }],
                    searchConfig: ['searchService', '$q', function(searchService, $q) {
                        var deferred = $q.defer();

                        searchService.getConfigPromise()
                        .then(function(searchConfig) {
                            deferred.resolve(searchConfig);
                        })
                        .catch(function(err) {
                            deferred.reject(err);
                        });

                        return deferred.promise;
                    }]
                }
            });
    };

    return searchConfig;

});
