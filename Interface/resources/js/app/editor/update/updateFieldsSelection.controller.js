define([

], function() {

    var updateFieldsSelectionController = /*@ngInject*/ function updateFieldsSelectionController($scope, $uibModal, taskData, pageData, postData, postService, $rootScope, $timeout, $state) {

        $scope.saving = false;

        $timeout(function() {
            $rootScope.$broadcast('selectExistingOverlay', { postId: postData.postId })
        });

        /**
        * Broadcast that a new area have been areaAccepted
        * This is then picked up by the imageViewer directive, and handled the same way as in the wizard.controller
        */
        $scope.updateSelectionArea = function updateSelectionArea() {
            $rootScope.$broadcast('areaAccepted');
        };

        /**
        * Go back to parent state
        */
        $scope.abort = function abort() {
            $state.go('^').then(function(){
                //Easy way to restore state before edit, reload the state
                $state.reload();
            });
        };

        /**
        * What to do when a new area have been selected. This is an event broadcast from the imageViewer.directive
        */
        $scope.$on('areaSelected', function(event, args) {

            var data = args.rect;

            //Indicate that we are saving post data
            $scope.saving = true;

            data.page_id = pageData.id;


            //Create or update post
            postService.update(taskData.id, data, postData.postId)
                .then(function(response) {
                    $state.go('^');
                })
                .catch(function(err) {

                    $scope.error = err;

                    $uibModal.open({

                        templateUrl: 'editor/error.modal.tpl.html',
                        //The type of modal. The error modal makes more room for the error text
                        windowClass: 'modal--error',

                        //Make wizard scope available to the modal
                        scope: $scope,

                        controller: ['$scope', function($scope) {
                            $scope.dismiss = function() {
                                $scope.$dismiss();
                            };
                        }]
                    });

                })
                .finally(function() {
                    //Done saving post
                    $scope.saving = false;
                });

        });

    };

    return updateFieldsSelectionController;

});
