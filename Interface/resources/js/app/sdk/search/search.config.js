define([

], function() {

    var searchConfig = /*@ngInject*/ function searchConfig($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {

        // Prevent default use of !# hash bang urls
        // @see https://stackoverflow.com/questions/41226122/url-hash-bang-prefix-instead-of-simple-hash-in-angular-1-6
        $locationProvider.hashPrefix('');

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
            .state('search.page.result.post', {
                url: 'post/:id',
                views: {
                    'navigation': {
                        template: '<h1>I am nav - to be done</h1>'
                    },
                    '': {
                        component: 'post'
                    }
                },
                resolve: {
                    data: ['$transition$', function ($transition$) {
                        console.log($transition$.params())
                        console.log('Get solr request based on id: ' + $transition$.params().id);
                        return $transition$.params().id;
                    }],
                    metadata: [function() {
                        return 'abe'
                    }]
                }
            })
            .state('search.page.result.data_page', {
                url: 'data_post/',
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
                    index:  undefined  
                },
                resolve: {
                    resultData: ['solrService', 'searchService', '$location', '$stateParams', '$q', function(solrService, searchService, $location, $stateParams, $q) {
                        
                        var deferred = $q.defer();
                        var currentIndex = null;

                        // Entry with pagination
                        if (searchService.currentSearch || searchService.urlParamsExist()) {

                            if ($stateParams.index === undefined && $location.search().index) {
                                currentIndex = parseInt($location.search().index);
                            }
                            else if ($stateParams.index) {
                                currentIndex = $stateParams.index;
                            }
                            else {
                                currentIndex = 0;
                            }
                            
                            // Either use active search configuration, or if that is absent, URL parameters
                            searchService.getConfigPromise()
                            .then(function(searchConfig) {
                                searchService.currentSearch = searchService.currentSearch || searchService.getSearch(searchConfig);
                                solrService.paginatedSearch(searchService.currentSearch.queries, searchService.currentSearch.filterQueries, searchService.currentSearch.collections, searchService.currentSearch.sortField, searchService.currentSearch.sortDirection, currentIndex)
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
