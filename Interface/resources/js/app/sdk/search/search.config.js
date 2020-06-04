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

            .state('search.page.results', {
                url: 'results',
                views: {
                    '@': {
                        templateUrl: 'sdk/search/search.results.tpl.html',
                        controller: 'searchResultsController as ctrl'
                    }
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
                url: 'post/:postId',
                views: {
                    'navigation': {
                        component: 'navigation'
                    },
                    '': {
                        component: 'post'
                    }
                },
                // Scroll the browser to the top
                onEnter: function() {
                    jQuery('html, body').animate({ scrollTop: 0 }, 100);
                },

                params: {
                    postId: null
                },

                resolve: {

                    userData: ['userService', 'tokenService', '$q', function (userService, tokenService, $q) {

                        return userService.getUserInfo(true);
                    }],

                    errorReportingConfig: ['errorService', function (errorService) {
                        return errorService.getConfig();
                    }],

                    searchData: ['solrService', function (solrService) {
                        return solrService.getSearchData();
                    }],

                    data: ['$q','$stateParams', '$transition$', 'solrService', 'searchService', function ($q, $stateParams, $transition$, solrService, searchService) {

                        var deferred = $q.defer(),
                            docs = null,
                            highlighting = null;

                        // Use post data from existing search
                        if (solrService.getSearchData()) {

                            docs = solrService.getSearchData().response.docs;
                            highlighting = solrService.getSearchData().highlighting;

                            // Find the post with the id in the url
                            var found = docs.find(function (doc) {
                                return doc.id === $stateParams.postId;
                            });

                            if (found) {
                                // Parse the jsonObj in the found post data
                                var obj = JSON.parse(found.jsonObj);

                                // Add highlighting if it exists
                                if (highlighting && highlighting[$stateParams.postId]) {
                                    obj.highlighting = highlighting[$stateParams.postId]
                                }

                                // resolve
                                deferred.resolve(obj);
                            }
                            // We somehow did not find the post we wanted
                            else {
                                console.log("error! could not find post by id" + $stateParams.postId);
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
                                    return solrService.search(
                                        queries,
                                        parsedConfig.filterQueries,
                                        parsedConfig.collections,
                                        parsedConfig.sortField,
                                        parsedConfig.sortDirection,
                                        0,
                                        1
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
