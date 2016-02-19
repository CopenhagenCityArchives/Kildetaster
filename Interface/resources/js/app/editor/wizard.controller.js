define([

], function() {

    var wizardController = /*@ngInject*/ function wizardController($scope, $rootScope, stepService, $stateParams, $location, $state, $timeout, $http, Flash) {

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

        //Object to keep track of what fields is currently marked as being editied
        $scope.editingFields = {};

        //Default settings for angular-schema-forms
        $scope.sfDefaults = {
            formDefaults: {
                feedback: false,
                supressPropertyTitles: true,
                disableSuccessState: true,
                ngModelOptions: {
                    updateOn: 'blur'
                }
            }
        };

        /**
         * When area is selected in the directive controlling openseadragon, and we are on the first step
         * go to the next step.
         */
        $scope.$on('areaSelected', function(event, args) {

            $scope.selectedAreaRect = args.rect;

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

            //If we are showing step 1, enable area selection
            if ($scope.currentStep === 1) {
                $scope.makeSelectable();
            }

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
            $scope.editingFields[item] = !$scope.editingFields[item];
        };

        /**
         * Ask if a given field is currently being edited
         */
        $scope.isEditing = function isEditing(field) {
            return $scope.editingFields[field];
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

            var postData = $scope.values;

            postData.page_id = $stateParams.pageId;
            postData.task_id = $stateParams.taskId;
            postData.post = $scope.selectedAreaRect;

            $http({
                method: 'POST',
                url: 'http://kbhkilder.dk/1508/stable/api/entries/',
                data: postData
            }).then(function(response) {
                
                console.log(response);

                //$state.go('.done', {}, { reload: true });
            }).catch(function(err) {
                console.log('post err', err);
            }).finally(function() {
                //console.log('SAVED!');
            });




        };

        /**
         * Move to next step
         */
        $scope.nextStep = function nextStep() {
            //$scope.$broadcast('schemaFormValidate');
            //return;
            $location.search({
                stepId: parseInt($scope.currentStep) + 1
            });
        };

        $scope.makeSelectable = function makeSelectable() {
            $rootScope.$broadcast('makeSelectable');
        };

        /**
         * Move to previous step
         */
        $scope.prevStep = function prevStep() {

            //If we are moving from step 1, make area selectable (since that is step 1)
            if ($scope.currentStep == 2) {
                $scope.makeSelectable();
            }
            //Update the search variable
            $location.search({
                stepId: parseInt($scope.currentStep) - 1
            });
        };

        $scope.goToStep = function goToStep(stepId) {

            if ($scope.currentStep === 1) {
                Flash.create('warning', 'Du skal vælge et område før du kan gå videre');
            } else {
                $state.go('.', { stepId: stepId });
            }


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

            $scope.mainProperty = response.keyName;

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
