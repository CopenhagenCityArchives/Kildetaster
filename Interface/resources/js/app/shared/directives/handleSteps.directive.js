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
                            var firstInput = $(element).find('bootstrap-decorator:first input:first');
                            firstInput.focus();

                        }, 0);
                    }

                });

                $(element).on('keydown', function(event) {                 

                    var firstInput = $(element).find('bootstrap-decorator:first input:first'),
                        lastInput = $(element).find('bootstrap-decorator:last input:last');

                    //Tab
                    if (event.keyCode === 9) {

                        //We are tabbing out of the first input field, and shift is pressed
                        if (event.shiftKey && $(event.target).is(firstInput)) {
                            
                            noAuto = true;
                            //To to the previous page
                            scope.prevFunc();

                            //Need a timeout to let the routing system change view
                            time = $timeout(function() {
                                //Set focus on the last input field
                                $(element).find('bootstrap-decorator:last input:last').focus();
                                noAuto = false;
                            }, 0);

                            //Force Angular to render new state
                            scope.$apply();

                            //Prevent the default tab+shift behaviour, to prevent focus from going 
                            //outside of the form. Will break functionality in Chrome without it
                            event.preventDefault();
                        }
                        //We are on the last input field, and shift is not pressed
                        else if (!event.shiftKey && $(event.target).is(lastInput)) {
                            
                            noAuto = true;

                            //To to next page
                            scope.nextFunc();

                            time = $timeout(function() {
                                //Set focus on the first input field
                                $(element).find('bootstrap-decorator:first input:first').focus();
                                noAuto = false;
                            }, 0);
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
