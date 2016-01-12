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
                        isLast = target.closest('.last').length > 0;

                    //Tab
                    if (event.keyCode === 9) {

                        if (event.shiftKey && isFirst) {
                            
                            scope.prevFunc();
                            
                            $timeout(function() {
                                //TODO why does this not work?!
                                $(element).find('input:last').focus();
                            }, 0);
                        }

                        else if (!event.shiftKey && isLast) {
                            scope.nextFunc();

                            $timeout(function() {
                                $(element).find('input:first').focus();
                            }, 0);
                        }
                    }
                });


                //Cleanup
                scope.$on('$destroy', function() {
                    $(element).off('keydown');
                });

            }
        };

    };

    return handleStepsDirective;

});
