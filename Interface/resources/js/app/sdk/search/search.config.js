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
                url: 'post/{postId:int}',
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

                    resultData: ['searchService', '$stateParams', '$q', function(searchService, $stateParams, $q) {

                        var data = {},
                            deferred = $q.defer(),
                            taskId;

                            data.postId = $stateParams.postId;

                        //We hit the url without having a search configured, just get post data
                        if (searchService.currentSearchConfig === null) {
                            
                            searchService.getPost($stateParams.postId)
                            .then(function(response) {

                                data.post = response.data;
                                data.metadata = response.metadata;
                                data.errorReports = response.error_reports;
                                data.taskId = taskId;

                                deferred.resolve(data);
                                return data;
                            });
                        }
                        //We have a search config, so manage paginated search
                        else {
                            searchService.paginatedSearch(searchService.currentSearchConfig.query)
                            .then(function(response) {
                                
                                data.numFound = response.response.numFound;
                                data.number = searchService.currentIndex + 1;

                                var postId = response.response.docs[0].post_id;
                                taskId = response.response.docs[0].task_id;

                                //And get post data
                                return searchService.getPost($stateParams.postId);
                            })
                            .then(function(response) {

                                data.post = response.data;
                                data.metadata = response.metadata;
                                data.errorReports = response.error_reports;
                                data.taskId = taskId;

                                deferred.resolve(data);

                                return data;
                            });

                        }

                        return deferred.promise;
                    }]
                }
                

            });
    };

    return searchConfig;

});