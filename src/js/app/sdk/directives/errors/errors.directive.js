define([

], function() {
    var errorsDirective = ['userService', 'errorService', 'helpers', 'EDITOR_URL', function(userService, errorService, helpers, EDITOR_URL) {
        return {
            restrict: 'E',
            scope: {},
            template: require('./errors.directive.tpl.html'),
            controller: ['$scope', function($scope) {
                $scope.loading = true;
                $scope.error = false;

                $scope.errorList = [];
                $scope.isSuperUser = false;
        
                //Object to store selections from dropdown filters
                $scope.filtered = { label: null };
        
                //The config object to use for filtereing the errorList
                $scope.selectedFilter = null;
        
                userService.getUserInfo()
                .then(function(response) {
                    //Store the users userId
                    $scope.userId = response.id;
        
                    //Determine if the user is a superuser of any task (arary contains something)
                    $scope.isSuperUser = response.super_user_tasks.length > 0;
        
                    //Get error reports for a given user
                    return errorService.getErrorReports({ relevant_user_id: $scope.userId });
                })
                .then(function(errorList) {
                    $scope.errorList = errorList;

                    if (errorList && $scope.isSuperUser === true) {
                        $scope.userList = helpers.uniqueBy(errorList, function(item) {
                            return item.username
                        });
        
                        $scope.fieldList = helpers.uniqueBy(errorList, function(item) {
                            if (item.label === undefined) {
                                item.label = 'Ikke angivet';
                            }
                            return item.label;
                        });
                    }

                    $scope.selectedFilter = {};
                    $scope.$apply();
                })
                .catch(function(err) {
                    $scope.error = true;
                    console.log("errors error", err);
                    $scope.$apply();
                })
                .finally(function() {
                    $scope.loading = false;
                    $scope.$apply();
                });
        
                $scope.dropdownChanged = function(prop, value) {
                    $scope.selectedFilter = {};
        
                    if (prop && value !== null) {
                        $scope.selectedFilter[prop] = value;
                    }
                };
        
                $scope.$watch('filtered.username', function(newval) {
                    if (newval && newval !== null) {
                        //Clear the other dropdown
                        $scope.filtered.label = null;
                    }
                });
        
                $scope.$watch('filtered.label', function(newval) {
                    if (newval && newval !== null) {
                        //Clear the other dropdown
                        $scope.filtered.username = null;
                    }
                });
        
                $scope.goToEditor = function(errorData) {
                    window.open(EDITOR_URL + '/#/task/' + errorData.tasks_id + '/page/' + errorData.pages_id + '/post/' + errorData.posts_id, '_blank');
                };
            }]
        }
    }];

    return errorsDirective;
});
