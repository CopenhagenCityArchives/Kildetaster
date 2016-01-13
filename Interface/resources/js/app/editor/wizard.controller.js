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

        $scope.values = {};

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
            } else {
                $scope.showComment = !$scope.showComment;
            }
        };

        $scope.isResult = function isResult() {
            return $scope.currentStep === $scope.numSteps;
        };

        $scope.save = function save() {

            console.log($scope.steps);

            //$state.go('.done', {}, { reload: true });
        };

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

        stepService.getData().then(function(response) {

            function groupBy(array, property) {
                var hash = {};
                for (var i = 0; i < array.length; i++) {
                    if (!hash[array[i][property]]) hash[array[i][property]] = [];
                    hash[array[i][property]].push(array[i]);
                }
                return hash;
            }

            function buildStepData(stepData) {

                var steps = [],
                    grouped = [];

                steps[0] = stepData.steps[0];

                stepData.entities.forEach(function(entity) {

                    var id;

                    if (entity.countPerEntry === 1) {

                        var data = groupBy(entity.fields, 'step');

                        for (id in data) {
                            steps[id] = {
                                id: stepData.steps[id].id,
                                title: stepData.steps[id].title,
                                description: stepData.steps[id].description,
                                fields: data[id]
                            };
                        }
                    }
                    else if (entity.countPerEntry === 'many') {
                        //Since this is a many entity, we know all its fields are to be placed on the same step,
                        // so grab the step from the first field
                        id = entity.fields[0].step;
                        steps[id] = {
                            id: stepData.steps[id].id,
                            title: stepData.steps[id].title,
                            description: stepData.steps[id].description,
                            //Indicate that the fields can be repeated
                            repeating: true,
                            fields: entity.fields
                        };
                    }

                });

                steps.push(stepData.steps[stepData.steps.length - 1]);

                return steps;

            }

            $scope.addAnother = function(fieldData) {
                console.log('field', fieldData);

            };

            $scope.steps = buildStepData(response);

            $scope.numSteps = $scope.steps.length;

            $scope.currentStepData = $scope.steps[$scope.currentStep - 1];
        });

    };

    return wizardController;
});
