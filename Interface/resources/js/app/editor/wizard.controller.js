define([

], function() {
    
    var wizardController = function($scope, $rootScope, stepService, $stateParams, $location, $state) {

        $scope.steps = [];        

        $scope.numSteps = null;

        $scope.currentStep = $stateParams.stepId || 1;

        $scope.completedSteps = [];

        $scope.comment = '';

        $scope.showComment = false;

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
            console.log('saving');

            $state.go('.done', {}, { reload: true })
        };

        /**
        * Because we do not trigger the ui.route logic, listen for changes to the location.search
        */
        $rootScope.$on('$locationChangeSuccess', function(event){
            $scope.currentStep = $location.search().stepId;
            $scope.currentStepData = $scope.steps[$scope.currentStep - 1];
        });

        stepService.getData().then(function(response) {
            $scope.steps = response;

            $scope.numSteps = response.length;

            $scope.currentStepData = $scope.steps[$scope.currentStep - 1];

        });


        $scope.nextStep = function nextStep() {
            $location.search({ stepId: parseInt($scope.currentStep) + 1 });
        };

        $scope.prevStep = function prevStep() {
            $location.search({ stepId: parseInt($scope.currentStep) - 1 })
        };


        $scope.validateStep = function validateStep() {

            stepService.validateStep($scope.formData).then(function(response) {
                if (response.isValid) {
                    $scope.completedSteps.push($scope.currentStepData);
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