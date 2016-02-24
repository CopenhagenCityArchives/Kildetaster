define([


], function() {

    var postController = /*@ngInject*/ function postController($scope, API, resultData, errorService, helpers) {

        $scope.collection = resultData.metadata.collection_name;
        $scope.unit = resultData.metadata.unit_description;
        $scope.pageNumber = resultData.metadata.page_number;

        $scope.post = resultData.post;

        $scope.errorReportingEnabled = false;


        $scope.toggleErrorReporting = function() {
            $scope.errorReportingEnabled = !$scope.errorReportingEnabled;
        };

        //TODO: Move to helpers
        $scope.getImageUrl = function getImageUrl() {
            return helpers.getImageUrlByPostId(resultData.postId);
        };

        $scope.report = function(field) {            
            
            var data = {
                post_id: resultData.postId,
                entity_name: field.entity_name,
                field_name: field.field_name,
                concrete_entries_id: field.parent_id,
                comment: field.comment
            };

            errorService.createErrorReport(data)
            .then(function(response) {
                console.log('Error report created!', response)
            });
           

            //console.log(resultData);
            //console.log('field', field);
        };
        

    };

    return postController;

});