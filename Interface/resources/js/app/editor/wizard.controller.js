define([
    
], function() {
    
    var wizardController = /*@ngInject*/ function($scope, $rootScope, stepService, $stateParams, $location, $state) {

        /**
        * When area is selected in the directive controlling openseadragon, and we are on the first step
        * go to the next step.
        */
        $scope.$on('areaSelected', function() {
            if ($scope.currentStep === 1) {
                $scope.nextStep();
            }
        });

        /**
        * Because we do not trigger the ui.route logic (see.editor.config.js), 
        * listen for changes to the location.search
        */
        $rootScope.$on('$locationChangeSuccess', function(event){
            $scope.currentStep = $location.search().stepId;
            $scope.currentStepData = $scope.steps[$scope.currentStep - 1];
        });
        
        $scope.steps = [];

        //http://stackoverflow.com/questions/24081004/angularjs-ng-repeat-filter-when-value-is-greater-than
        //predicate for filter in template
        $scope.hasValue = function hasValue(prop) {
            return function(item) {
                return item[prop] !== undefined && item[prop] !== ''
            };
        };

        //Toggle wether or not we should show edit field for a given field config
        $scope.toggleEditExistingValue = function toggleEditExistingValue(item) {
            item.isEditing = !item.isEditing;
        };

        $scope.numSteps = null;

        $scope.currentStep = $stateParams.stepId || 1;

        $scope.comment = '';
        $scope.showComment = false;

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
            
            alert('Saving entry');

            $scope.prepareData();

            $state.go('.done', {}, { reload: true });
        };

        //Loop over all fields and build json response for backend to save data
        $scope.prepareData = function prepareData() {    

        };

        stepService.getData().then(function(response) {
            $scope.steps = response;

            $scope.numSteps = response.length;

            $scope.currentStepData = $scope.steps[$scope.currentStep - 1];

        });


        $scope.nextStep = function nextStep() {
            $location.search({ stepId: parseInt($scope.currentStep) + 1 });
        };

        $scope.prevStep = function prevStep() {
            $location.search({ stepId: parseInt($scope.currentStep) - 1 });
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

    };

    return wizardController;
});