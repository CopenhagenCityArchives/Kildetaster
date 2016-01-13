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

                $(element).on('keydown', function(event) {

                    var target = $(event.target),
                        isFirst = target.closest('.first').length > 0,
                        isLast = target.closest('.last').length > 0,
                        time;

                    //Tab
                    if (event.keyCode === 9) {

                        //We are tabbing out of the first input field, and shift is pressed
                        if (event.shiftKey && isFirst) {
                            
                            //To to the previous page
                            scope.prevFunc();

                            //Need a timeout to let the routing system change view
                            time = $timeout(function() {
                                //Set focus on the last input field
                                $(element).find('input:last').focus();
                            }, 0);

                            //Force Angular to render new state
                            scope.$apply();

                            //Prevent the default tab+shift behaviour, to prevent focus from going 
                            //outside of the form. Will break functionality in Chrome without it
                            event.preventDefault();
                        }
                        //We are on the last input field, and shift is not pressed
                        else if (!event.shiftKey && isLast) {
                            //To to next page
                            scope.nextFunc();

                            time = $timeout(function() {
                                //Set focus on the first input field
                                $(element).find('input:first').focus();
                            }, 0);
                        }
                        
                    }
                });


                //Cleanup
                scope.$on('$destroy', function() {
                    $(element).off('keydown');
                    time.cancel();
                });

            }
        };

    };

    return handleStepsDirective;

});
