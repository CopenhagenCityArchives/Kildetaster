define([

], function() {
    
    var reportErrorDirective = [function reportErrorDirective() {
        return {
            restrict: 'E',

            scope: {
                data: '=',
            },

            template: require('./report-error.directive.tpl.html'),

            controller: ['$scope', 'errorService', function($scope, errorService) {

                var that = this;
                
                this.selected = null;
                this.selectedComment = null;

                console.log(this);

                console.log($scope);

                // Lookup in the config to find the matching confic, based on collection_id
               
                this.$onInit = function() {
                    errorService.getConfig().then(function (data) {
                        $scope.configData = data[$scope.data.collection_id].error_reports;
                    })
                }                
        
                $scope.saveErrorReport = function saveErrorReport() {
                    console.log("hit");
                    console.log(that);
                    console.log($scope);

                    var reportData = {
                        id: $scope.data.id,
        
                        // Only exists on burials
                        task_id: $scope.data.task_id,
                        post_id: $scope.data.post_id,
        
                        entity: $scope.selected.entity,
                        field: $scope.selected.field,
                        comment: $scope.selectedComment,
                        add_metadata: $scope.configData.add_metadata,
                        
                        // used for police and erindring type posts
                        collection_id: $scope.data.collection_id
                    };

                    console.log(reportData);
                    console.log(errorService);

                    // Save the error report
                    errorService.createErrorReport(reportData).then(function(response) {
                        console.log(response);
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