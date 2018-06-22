define([

    'clipboard'

], function(Clipboard) {

    var wizardController = /*@ngInject*/ function wizardController($uibModal, helpers, $scope, $rootScope, postService, stepService, $stateParams, pageData, taskData, $location, $state, $timeout, $http, Flash, API, pageService, SEARCHURL) {

        //Indicates if we should show the controls for accepting a new area (used on all other steps than the first)
        $scope.showSelectionControls = false;

        $scope.steps = [];

        $scope.numSteps = null;

        $scope.currentStep = $stateParams.stepId || 1;

        $scope.comment = '';
        $scope.showComment = false;

        $scope.wantFeedback = false;

        $scope.postId = undefined;
        $scope.shareLink = '';
        $scope.shareLinkId = undefined;

        //Will hold the inputted values
        $scope.values = {};

        //Object to keep track of what fields is currently marked as being editied
        $scope.editingField = '';

        $scope.singleFieldForms = {};
        $scope.singleSchema = {};
        $scope.singleValue = {};

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
        * Build the value structure for single fields, that is fields that are part of an array structure
        */
        $scope.getValue = function (key, subkey, id) {

            var valueInValues = $scope.values[$scope.mainProperty][key];

            var data = valueInValues[id];

            $scope.singleValue = data;

        };

        /**
        * Build schema for single fields, that is fields that are part of an array structure
        */
        $scope.getSchema = function getSchema(key, subkey) {

            var data = {
                type: 'object',
                properties: {}
            };

            data.properties[subkey] = $scope.schema.properties[$scope.mainProperty].properties[key].items.properties[subkey];

            $scope.singleSchema = data;

        };

        /**
         * When area is selected in the directive controlling openseadragon, and we are on the first step
         * go to the next step.
         */
        $scope.$on('areaSelected', function(event, args) {

            var data = args.rect;

            //Indicate that we are saving post data
            $scope.savingPost = true;

            data.page_id = pageData.id;

            var postServiceMethod = 'create';

            //We have already have a postId for the post, so update the id we have
            if ($scope.postId) {
                postServiceMethod = 'update';
            }

            //Create or update post
            postService[postServiceMethod](data, $scope.postId)
                .then(function(response) {

                    if (response.data && response.data.post_id) {
                        $scope.postId = response.data.post_id;
                    }

                    //http://stackoverflow.com/questions/12729122/angularjs-prevent-error-digest-already-in-progress-when-calling-scope-apply
                    $timeout(function() {
                        $scope.showSelectionControls = false;
                    });
                })
                .catch(function(err) {

                    //Make sure area selection is possible, because something went wrong trying to save
                    //the selected area
                    $scope.placeArea();

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
                    $scope.savingPost = false;
                });

        });

        /**
        * Test if the current form is valid before allowing to change location
        */
        $rootScope.$on('$locationChangeStart', function(event, toUrl, fromUrl) {

            //Validate the form
            $scope.$broadcast('schemaFormValidate');

            //If the form is not valid, prevent changing the location variable and thus
            //going to the next step
            if ($scope.stepForm && $scope.stepForm.$invalid) {
                event.preventDefault();
            }
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
            //Hack to force focus on button and not links in header
            $timeout(function() {
                if ($scope.currentStep == $scope.steps.length) {
                    //Last step, so focus on the save button
                    $('#save-button').focus();
                } else if ($scope.currentStep == 2) {
                    $('#step-form').find('.ui-select-match').first().children().focus();
                } else {
                    $('#step-form').find('input').first().focus();
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

            if ($scope.editingField === item) {
                $scope.editingField = '';
            }
            else {
                $scope.editingField = item;
            }

        };

        $scope.closeEditField = function closeEditField() {
            $scope.editingField = '';
        };

        /**
         * Ask if a given field is currently being edited
         */
        $scope.isEditing = function isEditing(field) {
            return $scope.editingField == field;
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

        /**
        * Save the entry in the backend
        */
        $scope.save = function save() {

            var postData = $scope.values;

            postData.page_id = pageData.id;
            postData.task_id = $stateParams.taskId;
            postData.post_id = $scope.postId;

            $scope.saving = true;

            $http({
                method: 'POST',
                url: API + '/entries/',
                data: postData
            }).then(function(response) {

                //If the reqeust was ok from the server, assume everything is allright
                $scope.entrySaved = true;
                $scope.shareLinkId = response.data.solr_id;

                //Continue Step, so focus on continue button
                $timeout(function() {
                    $('#done-button').focus();
                });

            }).catch(function(err) {

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
                $scope.saving = false;
            })

        };

        /**
         * Move to next step
         */
        $scope.nextStep = function nextStep() {

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
            
            //If we are step 1, return to outside the form, and restore selectable area
            if ($scope.currentStep === 1) {
                $scope.makeSelectable();
                $state.go('^');
            }

            //Validate the form
            $scope.$broadcast('schemaFormValidate');

            //If the current step is not valid, prevent going to previous step
            if ($scope.stepForm.$invalid) {
                return;
            }

            

            //Update the search variable
            $location.search({
                stepId: parseInt($scope.currentStep) - 1
            });
        };
        
        $scope.goToStep = function goToStep(stepId) {
            $state.go('.', { stepId: stepId });
        };
        
        $scope.postDone = function postDone() {
            $state.go('editor.page.new', {}, { reload: true });
        };

        
        $scope.$on('okToSetPageDone', function(event) {
            
            pageService.pageIsDone({
                page_id: pageData.id,
                task_id: taskData.id
            })
            .then(function(response) {
                //Reload current route
                $state.go($state.current, {}, {reload: true});
            })
            .catch(function(err) {
                console.log('Err', err);
            });
            
        });
        
        /**
         * Tell the app that we want to place/replace the area
         */
        $scope.placeArea = function placeArea() {
            //Broadcast that we want to make area selectable
            $rootScope.$broadcast('makeSelectable');
            //Show controls to accept new area
            $scope.showSelectionControls = true;
        };
        
        $scope.toggleShareLink = function() {
            $scope.buildShareLink($scope.shareLinkId);
            $scope.showShareLink = !$scope.showShareLink;
        };


        /**
         * Create keyboard shortcuts for shifting between tabs in the wizard
         * 
         * Shift + Arrow Up     : Go one tab up/back
         * Shift + Arrow Down   : Go one tab down/forward
         * 
         */
        $scope.keyboardShortcuts = function keyboardShortcuts() {
            document.onkeyup = function(e) {
                //For cross-browser compability
                var key = e.which || e.keyCode;

                if (e.shiftKey && key == 38) {
                    if ($scope.currentStep > 1) {
                        $scope.goToStep(parseInt($scope.currentStep) - 1);
                    }
                } else if (e.shiftKey && key == 40) {
                    if ($scope.currentStep < $scope.numSteps) {
                        $scope.goToStep(parseInt($scope.currentStep) + 1);
                    }
                } 
              };
        }
        
        /**
         * Lookup the value of a specifik object path in the $scope.values object
         *
         * @param key {string|array} The path to the value
         *
         * @return The value found, or an empty string if none were found
         */
        $scope.lookupFieldValue = function lookupFieldValue(key) {
            return helpers.lookupFieldValue(key, $scope.values);
        };
        
        /**
         * Delete value on the given key from the values object
         *
         * @param key {string|array} The path to the value
        * @param subkey {string} The property name to look for in an array type field
        * @param index {int} The index of the field, ie. the index of the field in the array object
        */
        $scope.removeFieldValue = function removeFieldValue(key, subkey, index) {

            //Path can be either a string, or an array
            var path = angular.isArray(key) ? key : key.split('.'),
                len = path.length;

            path.reduce(function(accumulator, currentValue, currentIndex, arr) {
                //Are we on the last iteration of the reduce?
                if (currentIndex === len - 1) {

                    if (subkey && index !== undefined) {
                        //Find the subkey, and delete it
                        if (subkey in accumulator[currentValue][index]) {
                            delete accumulator[currentValue][index][subkey]
                        }
                    }
                    else {
                        delete accumulator[currentValue];
                    }

                }
                return accumulator[currentValue];
            }, $scope.values);

            $scope.closeEditField();

        };

        /**
        * When postId has a value, build link to the id
        */
        $scope.$watch('shareLinkId', function(newVal) {

            if (newVal !== undefined) {
                var link = SEARCHURL + '/post/' + newVal;

                $scope.shareLink = link;
            }
        });

        /**
         * Load step data from the server
         */
        stepService.getData(taskData.id).then(function(response) {

            //The schema setup
            $scope.schema = response.schema;

            $scope.mainProperty = response.keyName;

            //TODO: Remove the check if backend removes the step, so that id 1 can be used once again
            //Test if Step id 1 exists, as it is skipped and handle stepdata accordingly
            if(response.steps.some(function(element) {
                return element.id === "1"
            })) {
                $scope.steps = response.steps.filter(function(element) {
                    return element.id !== "1";
                });
            } else {
            $scope.steps = response.steps;
            }

            //Take note of the total number of steps
            $scope.numSteps = $scope.steps.length;

            //Prepare the initial step data, so we can render the current step
            $scope.currentStepData = $scope.steps[$scope.currentStep - 1];

            $scope.summaryFields = helpers.prepareSummaryData(response.steps, response.schema, response.keyName);

            //Set focus in first field of schema, if its step 1
            $timeout(function() {
                if($scope.currentStep === 1) {
                    //First step needs focus in first field.
                    $('#step-form').find('input').first().focus();
                }
            });

        });

        $scope.init = function() {
            $rootScope.$broadcast('zoom-to-selection');
            $scope.acceptArea();
            $scope.keyboardShortcuts();
        };

    };

    return wizardController;
});
