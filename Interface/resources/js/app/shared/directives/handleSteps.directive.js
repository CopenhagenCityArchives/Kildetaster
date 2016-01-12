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

                        if (event.shiftKey && isFirst) {
                            
                            scope.prevFunc();

                            //Need a timeout to let the routing system change view
                            time = $timeout(function() {
                                $(element).find('input:visible:last').focus();
                            }, 300);
                            

                            // scope.$apply(function() {
                            //     console.log('focusing', $(element).find('input:last'));
                            //     $(element).find('input:last').focus();
                            // });
                            
                            //timeout required otherwise the change does not kick in until next digest??
                            // $timeout(function() {
                            //     //TODO why does this not work?!
                            //     //This does not set focus
                            //     $(element).find('input:last').focus();
                            // }, 0);
                        }

                        else if (!event.shiftKey && isLast) {
                            scope.nextFunc();

                            $timeout(function() {
                                $(element).find('input:first').focus();
                            }, 0);
                        }

                        return true;
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
