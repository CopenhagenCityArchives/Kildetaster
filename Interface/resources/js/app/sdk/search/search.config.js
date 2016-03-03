define([

], function() {

    var searchConfig = /*@ngInject*/ function editorConfig($stateProvider, $urlRouterProvider) {

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

            .state('search.post', {
                url: 'post/{postId:int}',
                views: {
                   '@': {
                        templateUrl: 'sdk/search/post.tpl.html',
                        controller: 'postController'
                    }
                },
                resolve: {
                    resultData: ['searchService', '$stateParams', '$q', function(searchService, $stateParams, $q) {

                        var data = {},
                            
                            deferred = $q.defer(),

                            taskId;

                        searchService.getPost($stateParams.postId)
                        .then(function(response) {

                            data.postId = $stateParams.postId;
                            data.post = response.data;
                            data.metadata = response.metadata;
                            data.errorReports = response.error_reports;
                            data.taskId = response.metadata.task_id;

                            deferred.resolve(data);
                            
                            return data;
                        });

                        return deferred.promise;
                    }]
                }
            })

            .state('search.page', {
                url: '',
                views: {
                    '': {
                        templateUrl: 'sdk/templates/search.tpl.html',
                        controller: 'searchController'
                    },
                    'facets': {
                        templateUrl: 'sdk/templates/search.facets.tpl.html',
                        controller: 'searchFacetsController'
                    }
                },
                resolve: {
                    availableFields: ['searchService', function(searchService) {
                        return searchService.getFields().then(function(response) {
                            return response[0].fields;
                        });
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
            .state('search.page.result.page', {
                url: 'result/{index:int}/',
                views: {
                   
                    'navigation': {
                        templateUrl: 'sdk/search/post.navigation.tpl.html',
                        controller: 'navigationController'
                    },
                    '': {
                        templateUrl: 'sdk/search/post.tpl.html',
                        controller: 'postController'
                    }
                },
                resolve: {
                    haveQuery: ['searchService', '$state', '$q', '$timeout', function(searchService, $state, $q, $timeout) {
                         //If we dont have a search config, do not permit rendering of a specific result page
                         if (searchService.currentSearchConfig === null) {
                            $timeout(function() {
                               $state.go('search.page'); 
                            });
                            return $q.reject();
                        }

                    }],

                    resultData: ['searchService', '$stateParams', '$q', function(searchService, $stateParams, $q) {

                        var data = {};

                        var deferred = $q.defer();

                        var taskId;

                        searchService.paginatedSearch(searchService.currentSearchConfig.query, $stateParams.index - 1)
                        .then(function(response) {
                            
                            data.numFound = response.response.numFound;
                            data.number = $stateParams.index;

                            var postId = response.response.docs[0].post_id;
                            taskId = response.response.docs[0].task_id;
                            
                            data.postId = postId;

                            return searchService.getPost(postId);
                        })
                        .then(function(response) {

                            data.post = response.data;
                            data.metadata = response.metadata;
                            data.errorReports = response.error_reports;
                            data.taskId = taskId;

                            deferred.resolve(data);
                            
                            return data;
                        });

                        return deferred.promise;
                    }]
                }
                

            });
    };

    return searchConfig;

});