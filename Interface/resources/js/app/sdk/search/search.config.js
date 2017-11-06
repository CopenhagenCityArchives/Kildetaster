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
            // 
            // .state('search.page.result.data_page', {
            //     url: 'data_post/',
            //     views: {
            //         'navigation': {
            //             templateUrl: 'sdk/search/post.navigation.tpl.html',
            //             controller: 'navigationController'
            //         },
            //         '': {
            //             templateUrl: 'sdk/search/data-post.tpl.html',
            //             controller: 'datapostController'
            //         }
            //     },
            //     params: {
            //         highlighting: {},
            //         index:  undefined  
            //     },
            //     resolve: {
            //         resultData: ['solrService', 'searchService', '$location', '$stateParams', '$q', function(solrService, searchService, $location, $stateParams, $q) {
                        
            //             var deferred = $q.defer();
            //             var currentIndex = null;

            //             // Entry with pagination
            //             if (searchService.currentSearch || searchService.urlParamsExist()) {

            //                 if ($stateParams.index === undefined && $location.search().index) {
            //                     currentIndex = parseInt($location.search().index);
            //                 }
            //                 else if ($stateParams.index) {
            //                     currentIndex = $stateParams.index;
            //                 }
            //                 else {
            //                     currentIndex = 0;
            //                 }
                            
            //                 // Either use active search configuration, or if that is absent, URL parameters
            //                 searchService.getConfigPromise()
            //                 .then(function(searchConfig) {
            //                     searchService.currentSearch = searchService.currentSearch || searchService.getSearch(searchConfig);
            //                     solrService.paginatedSearch(searchService.currentSearch.queries, searchService.currentSearch.filterQueries, searchService.currentSearch.collections, searchService.currentSearch.sortField, searchService.currentSearch.sortDirection, currentIndex)
            //                     .then(function(results) {
            //                         if (results && results.response && results.response.numFound > 0) {
            //                             deferred.resolve(results.response);
            //                         } else {
            //                             deferred.reject("no results for page");
            //                         }
            //                     })
            //                     .catch(function(err) {
            //                         deferred.reject(err);
            //                     })
            //                 }).catch(function(err) {
            //                     deferred.reject(err);
            //                 });
                        
            //             }
            //             // Entry without pagination
            //             else {
            //                 var queries = angular.copy(searchService.currentSearch.queries);
            //                 queries.push({
            //                     field: { name: 'id', type: 'string' },
            //                     operator: { op: 'eq' },
            //                     term: $stateParams.dataPostId
            //                 });
            //                 solrService.pageinatedSearch(queries, searchService.currentSearch.facets, searchService.currentSearch.collections, searchService.currentSearch.sortField, searchService.currentSearch.sortDirection, 0)
            //                 .then(function(results) {
            //                     deferred.resolve(results.respones);
            //                 }).catch(function(err) {
            //                     deferred.reject(err);
            //                 });
            //             }

            //             return deferred.promise;
            //         }],
            //         searchConfig: ['searchService', '$q', function(searchService, $q) {
            //             var deferred = $q.defer();

            //             searchService.getConfigPromise()
            //             .then(function(searchConfig) {
            //                 deferred.resolve(searchConfig);
            //             })
            //             .catch(function(err) {
            //                 deferred.reject(err);
            //             });

            //             return deferred.promise;
            //         }]
            //     }
            // })
            .state('search.page.result.post', {
                url: 'post/:postId',
                views: {
                    'navigation': {
                        component: 'navigation'
                    },
                    '': {
                        component: 'post'
                    }
                },
                params: {
                    postId: null
                },
                resolve: {

                    searchData: ['solrService', function (solrService) {
                        console.log('data', solrService.getSearchData());
                        return solrService.getSearchData();
                    }],

                    json: ['$q','$stateParams', '$transition$', 'solrService', 'searchService', function ($q, $stateParams, $transition$, solrService, searchService) {

                        var deferred = $q.defer(),
                            docs = null;
        
                        console.log('jsondata', solrService.getSearchData());

                        // Use post data from existing search
                        if (solrService.getSearchData()) {
                            
                            docs = solrService.getSearchData().response.docs;

                            // Find the post with the id in the url
                            var found = docs.find(function (doc) {
                                return doc.id === $stateParams.postId;
                            });

                            if (found) {
                                // Parse the jsonObj in the found post data
                                deferred.resolve(JSON.parse(found.jsonObj));
                            }
                            // We somehow did not find the post we wanted
                            else {
                                deferred.reject('Post not found in saved search data!');
                            }
                        }
                        // Fetch new post data
                        else {
                            
                            // Get current search config
                            searchService.getConfigPromise()
                                .then(function(response) {
                                    return response;
                                })
                                .then(function(config) {
                                    // Parse the config, preparing it for solr
                                    var parsedConfig = searchService.getSearch(config),
                                        queries = [];

                                    // Make a forced search query to get a specifik post by its id
                                    queries.push({
                                        field: { name: 'id', type: 'string' },
                                        operator: { op: 'eq' },
                                        term: $stateParams.postId
                                    });

                                    // Call solr with the config and query
                                    return solrService.paginatedSearch(
                                        queries, 
                                        parsedConfig.filterQueries, 
                                        parsedConfig.collections, 
                                        parsedConfig.sortField, 
                                        parsedConfig.sortDirection,
                                        0
                                    );

                                })
                                .then(function(data) {
                                    // Parse and return the parsed jsonObj on the returned data object
                                    deferred.resolve(JSON.parse(data.response.docs[0].jsonObj));
                                });
                        }

                        return deferred.promise;

                    }]
                }
            });
    };

    return searchConfig;

});
