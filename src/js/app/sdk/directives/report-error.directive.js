define([

], function() {
    
    var reportErrorDirective = [function reportErrorDirective() {
        return {
            restrict: 'E',

            scope: {
                data: '=',
                refresh: '=',
            },

            template: require('./report-error.directive.tpl.html'),

            controller: ['$scope', 'errorService', function($scope, errorService) {
                
                this.selected = null;
                this.selectedComment = null;

                // Lookup in the config to find the matching confic, based on collection_id
               
                this.$onInit = function() {
                    errorService.getConfig().then(function (data) {
                        $scope.configData = data[$scope.data.collection_id].error_reports;
                        $scope.add_metadata = data[$scope.data.collection_id].add_metadata;
                    })
                }                
        
                $scope.saveErrorReport = function saveErrorReport() {
                    var reportData = {
                        id: $scope.data.id,
        
                        // Only exists on burials
                        task_id: $scope.data.task_id,
                        post_id: $scope.data.post_id,
        
                        entity: $scope.selected.entity,
                        field: $scope.selected.field,
                        comment: $scope.selectedComment,
                        add_metadata: $scope.add_metadata,
                        
                        // used for police and erindring type posts
                        collection_id: $scope.data.collection_id
                    };

                    // Save the error report
                    errorService.createErrorReport(reportData).then(function(response) {
                        console.log(response);
                        $scope.refresh();
                    })
                    .catch(function(err) {
                        console.log('Failed saving error report: ', err);
                    });
                };        
            }],
            
        }



    }]
    return reportErrorDirective;
});