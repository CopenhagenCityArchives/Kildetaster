define([
    
], function() {
    
    var wizardController = /*@ngInject*/ function wizardController($scope, $rootScope, stepService, $stateParams, $location, $state, $timeout) {

        //Indicates if we should show the controls for accepting a new area (used on all other steps than the first)
        $scope.showSelectionControls = false;

        $scope.steps = [];

        $scope.numSteps = null;

        $scope.currentStep = $stateParams.stepId || 1;

        $scope.comment = '';
        $scope.showComment = false;

        $scope.wantFeedback = false;

        /**
        * When area is selected in the directive controlling openseadragon, and we are on the first step
        * go to the next step.
        */
        $scope.$on('areaSelected', function() {
            if ($scope.currentStep === 1) {
                $scope.nextStep();
            }
            //http://stackoverflow.com/questions/12729122/angularjs-prevent-error-digest-already-in-progress-when-calling-scope-apply
            $timeout(function() {
                $scope.showSelectionControls = false;
            });
        });

        /**
        * Because we do not trigger the ui.route logic (see.editor.config.js), 
        * listen for changes to the location.search
        */
        $rootScope.$on('$locationChangeSuccess', function(event){
            //Make sure we treat currentStep value as an integer
            $scope.currentStep = parseInt($location.search().stepId);
            $scope.currentStepData = $scope.steps[$scope.currentStep - 1];
        });

        $scope.acceptArea = function acceptArea() {
            $rootScope.$broadcast('areaAccepted');
            $scope.showSelectionControls = false;           
        };
  

        //http://stackoverflow.com/questions/24081004/angularjs-ng-repeat-filter-when-value-is-greater-than
        //predicate for filter in template
        $scope.hasValue = function hasValue(prop) {
            return function(item) {
                return item[prop] !== undefined && item[prop] !== '';
            };
        };

        //Toggle wether or not we should show edit field for a given field config
        $scope.toggleEditExistingValue = function toggleEditExistingValue(item) {
            item.isEditing = !item.isEditing;
        };       

        /**
        * Toggle wether or not to show the comment text area
        */
        $scope.toggleComment = function toggleComment(force) {

            if (force) {
                $scope.showComment = force;
            }
            else {
                $scope.showComment = !$scope.showComment;
            }
        };

        $scope.isResult = function isResult() {
            return $scope.currentStep === $scope.numSteps;
        };

        $scope.save = function save() {           
            $state.go('.done', {}, { reload: true });
        };

        /**
        * Move to next step
        */
        $scope.nextStep = function nextStep() {
            $location.search({ stepId: parseInt($scope.currentStep) + 1 });            
        };

        /**
        * Move to previous step
        */
        $scope.prevStep = function prevStep() {
            //If we are moving from step 1, make area selectable (since that is step 1)
            if ($scope.currentStep == 2) {
                $rootScope.$broadcast('makeSelectable');
            }
            //Update the search variable
            $location.search({ stepId: parseInt($scope.currentStep) - 1 });
        };


        /**
        * Tell the app that we want to place/replace the area
        */
        $scope.placeArea = function placeArea() {
            //Broadcast that we want to make area selectable
            $rootScope.$broadcast('makeSelectable');
            //Show controls to accept new area
            $scope.showSelectionControls = true;
        };


        $scope.validateStep = function validateStep() {

            stepService.validateStep($scope.formData).then(function(response) {
                //We have a valid step
                if (response.isValid) {
                    
                    //And move to the next step
                    $scope.nextStep();
                }
                else {
                    //update formData with validation issues
                }
            });
        };

        stepService.getData().then(function(response) {
            $scope.steps = response;

            $scope.numSteps = response.length;

            $scope.currentStepData = $scope.steps[$scope.currentStep - 1];

        });

    };

    return wizardController;
});