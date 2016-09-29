/**
* Switch pages in wizard when tabbing or shift-tabbing on the last and first input field
* in the forms
*/
define([

    'jquery'

], function($) {

    var handleStepsDirective = /*@ngInject*/ function handleStepsDirective($timeout) {

        return {
            restrict: 'A',

            scope: {
                nextFunc: '=next',
                prevFunc: '=prev'
            },

            link: function(scope, element, attrs) {

                //Should we try to set focus automatically?
                var noAuto = false,
                    time;

                //When we have a location change
                scope.$on('$locationChangeSuccess', function(event) {

                    //And we are allowed to automatically set focus
                    if (!noAuto) {

                        $timeout(function() {
                            var firstInput = $(element).find('bootstrap-decorator:first :input:first');

                            if (firstInput.hasClass('ui-select-match')) {
                                firstInput = firstInput.parent();
                            }
                            firstInput.focus();
                        }, 0);
                    }

                });

                $(element).on('keydown', function(event) {

                    var firstInput = $(element).find('bootstrap-decorator:first :input:first'),
                        lastInput = $(element).find('bootstrap-decorator:last :input:last');

                    if (firstInput.hasClass('ui-select-match')) {
                        firstInput = firstInput.parent();
                    }

                    if (lastInput.hasClass('ui-select-match')) {
                        lastInput = lastInput.parent();
                    }

                    //Tab
                    if (event.keyCode === 9) {

                        //We are tabbing out of the first input field, and shift is pressed
                        if (event.shiftKey && $(event.target).is(firstInput)) {

                            noAuto = true;
                            //Go to the previous page
                            scope.prevFunc();

                            //Need a timeout to let the routing system change view
                            time = $timeout(function() {
                                //Set focus on the last input field
                                var elm = $(element).find('bootstrap-decorator:last input:last');

                                if (elm.hasClass('ui-select-match')) {
                                    elm = elm.parent().controller('uiSelect');
                                    //@see https://github.com/angular-ui/ui-select/issues/201
                                    elm = elm.focusser[0];
                                }
                                elm.focus();

                                noAuto = false;
                            }, 200);

                            //Force Angular to render new state
                            scope.$apply();

                            //Prevent the default tab+shift behaviour, to prevent focus from going
                            //outside of the form. Will break functionality in Chrome without it
                            event.preventDefault();
                        }
                        //We are on the last input field, and shift is not pressed
                        else if (!event.shiftKey && $(event.target).is(lastInput)) {

                            console.log('else if', lastInput)
                            noAuto = true;

                            //Go to next page
                            scope.nextFunc();

                            time = $timeout(function() {
                                //Set focus on the first input field
                                var elm = $(element).find('bootstrap-decorator:first input:first');

                                if (elm.hasClass('ui-select-search')) {
                                    elm = elm.parent().controller('uiSelect');
                                    //@see https://github.com/angular-ui/ui-select/issues/201
                                    elm = elm.focusser[0];
                                }

                                elm.focus();

                                noAuto = false;

                            }, 200);
                        }

                    }
                });


                //Cleanup
                scope.$on('$destroy', function() {
                    $(element).off('keydown');

                    if (time && typeof(time.cancel) === 'function') {
                        time.cancel();
                    }

                });

            }
        };

    };

    return handleStepsDirective;

});
