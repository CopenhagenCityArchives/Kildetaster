define([

], function() {

    var wizardController = /*@ngInject*/ function wizardController($scope, $rootScope, stepService, $stateParams, $location, $state, $timeout, $http) {

        //Indicates if we should show the controls for accepting a new area (used on all other steps than the first)
        $scope.showSelectionControls = false;

        $scope.steps = [];

        $scope.numSteps = null;

        $scope.currentStep = $stateParams.stepId || 1;

        $scope.comment = '';
        $scope.showComment = false;

        $scope.wantFeedback = false;

        //Will hold the inputted values
        $scope.values = {};

        //Default settings for angular-schema-forms
        $scope.sfDefaults = {
            formDefaults: {
                feedback: false,
                supressPropertyTitles: true,
                ngModelOptions: {
                    updateOn: 'blur'
                }
            }
        };

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
        $rootScope.$on('$locationChangeSuccess', function(event) {
            //Make sure we treat currentStep value as an integer
            $scope.currentStep = parseInt($location.search().stepId);
            $scope.currentStepData = $scope.steps[$scope.currentStep - 1];

            //TODO: Remove this!
            //Hack to force focus on button and no links in header
            $timeout(function() {
                if ($scope.currentStep == $scope.steps.length + 1) {
                    $('.editor-form-container button:first').focus();
                }
            });

        });

        $scope.acceptArea = function acceptArea() {
            $rootScope.$broadcast('areaAccepted');
            $scope.showSelectionControls = false;
        };


        //http://stackoverflow.com/questions/24081004/angularjs-ng-repeat-filter-when-value-is-greater-than
        //predicate for filter in template
        // Will return true if the field is either empty/null or is marked unreadable
        $scope.hasValue = function hasValue(prop) {

            return function(item) {
                return (item[prop] !== undefined && item[prop] !== '') || item.unreadable;
            };

        };

        /**
         * Toggle wether or not we should show edit field for a given field config
         */
        $scope.toggleEditExistingValue = function toggleEditExistingValue(item) {

            var field = $scope.schema.properties[item];
            field.isEditing = !field.isEditing;
        };

        /**
         * Ask if a given field is currently being edited
         */
        $scope.isEditing = function isEditing(field) {
            return $scope.schema.properties[field].isEditing;
        };

        /**
         * Toggle wether or not to show the comment text area
         */
        $scope.toggleComment = function toggleComment(force) {

            if (force) {
                $scope.showComment = force;
            } else {
                $scope.showComment = !$scope.showComment;
            }
        };

        $scope.isResult = function isResult() {
            return $scope.currentStep === $scope.numSteps;
        };

        $scope.save = function save() {

            $http.post('endpoint').then(function(response) {
                console.log('Ok', response)
            }).catch(function(err) {

                var fake = {
                    valid: false,
                    fields: {
                        2: {
                            msg: "Ugyldige tegn"
                        }
                    }
                };

                //parseResponse(fake);

                console.log('err', err);
            });

            //$state.go('.done', {}, { reload: true });
        };

        // function parseResponse(response) {

        //     var err;

        //     for (err in response.fields) {

        //         var errorDetails = response.fields[err];
        //         var fieldConfig =  $scope.schema.properties[err];

        //        fieldConfig.validationMessage = errorDetails.msg;
        //        fieldConfig.inError = true;

        //        $scope.$broadcast('schemaFormRedraw');
        //     }
        //     console.log($scope.schema.properties["2"]);    
        // }

        /**
         * Move to next step
         */
        $scope.nextStep = function nextStep() {
            $location.search({
                stepId: parseInt($scope.currentStep) + 1
            });
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
            $location.search({
                stepId: parseInt($scope.currentStep) - 1
            });
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

        /**
         * Load step data from the server
         */
        stepService.getData().then(function(response) {

            //The schema setup
            $scope.schema = response.schema;

            //Stepdata, including form config
            $scope.steps = response.steps;

            //Take note of the total number of steps
            $scope.numSteps = $scope.steps.length;

            //Prepare the initial step data, so we can render the current step
            $scope.currentStepData = $scope.steps[$scope.currentStep - 1];
        });

    };

    return wizardController;
});
