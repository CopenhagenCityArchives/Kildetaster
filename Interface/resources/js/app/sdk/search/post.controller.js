define([


], function() {

    var postController = /*@ngInject*/ function postController($scope, API, EDITORURL, resultData, errorService, userService, tokenService, helpers) {

        $scope.collection = resultData.metadata.collection_name;
        $scope.unit = resultData.metadata.unit_description;
        $scope.pageNumber = resultData.metadata.page_number;

        $scope.errorReports = resultData.errorReports;

        $scope.post = resultData.post;

        $scope.kildeviserUrl = resultData.metadata.kildeviser_url;

        $scope.errorReportingEnabled = false;

        //Determine the editor link visibility based on wether or not the user can edit
        $scope.showEditorLink = resultData.metadata.user_can_edit;

        $scope.toggleErrorReporting = function() {
            $scope.errorReportingEnabled = !$scope.errorReportingEnabled;
        };

        $scope.getImageUrl = function getImageUrl() {
            return helpers.getImageUrlByPostId(resultData.postId);
        };

        $scope.report = function(field) {

            var data = {
                post_id: resultData.postId,
                entity_name: field.entity_name,
                field_name: field.field_name,
                concrete_entries_id: field.parent_id,
                comment: field.comment,
                value: field.value
            };

            errorService.createErrorReport(data)
            .then(function(response) {
                //Hide the form
                field.showErrorForm = false;
                //Mark field as in error, and store comment given
                field.error = {
                    comment: field.comment
                };
                //Show message
                field.errorAccepted = true;
            })
            .catch(function(err) {
                console.log('Fejl i oprettelse af fejlrapport', err);
            });

        };

        $scope.editorUrl = function(field) {
            var taskId = resultData.metadata.task_id,
                pageId = resultData.metadata.page_id,
                postId = resultData.metadata.post_id;

            return EDITORURL + '/#/task/' + taskId + '/page/' + pageId + '/post/' + postId;
        };


        /**
        * Add information about errors to the post data
        */
        function addErrorInfo() {

            //Loop over each error report
            $scope.errorReports.forEach(function(report) {

                //Loop over all fields
                var fieldWithError = $scope.post.find(function(entity) {

                    //See if the entities match
                    if (entity.entity_name === report.entity_name) {

                        //Locate the field that is in error and mark it
                        var found = entity.fields.find(function(field) {

                            //Array structures
                            if (angular.isArray(field)) {
                                field.forEach(function(subfield) {
                                    if (subfield.field_name === report.field_name && subfield.parent_id === report.concrete_entries_id) {
                                    subfield.error = report;
                                    return true;
                                }
                                });
                            }
                            //Regular fields
                            else {
                                if (field.field_name === report.field_name && field.parent_id === report.concrete_entries_id) {
                                    field.error = report;
                                    return true;
                                }
                            }
                        });

                        return found !== undefined;
                    }

                });

            });
        }

        addErrorInfo();

    };

    return postController;

});
