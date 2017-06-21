define([],

function() {

    /**
    * Format a given string by removing decimals for numbers without the need, and remove trailing 0
    */
    var formatStringNumberFilter = function formatStringNumberFilter() {

        return function(input) {

            //Invert to a string, or work on an empty string
            input = '' + input || '';

            var str = input.split(',');

            //The string did not contain a , char
            if (str.length === 1) {
                return input;
            }
            //the second part is exactly 00
            else if (str[1] === '00') {
                return str[0];
            }
            //We have decimals that needs to be handled
            else {
                //Test if the very last char is a 0, if so, remove it, otherwise return the whole string
                return input.charAt(input.length - 1) === '0' ? input.slice(0, -1) : input;
            }

            return input;
        };
    };

    return formatStringNumberFilter;
});
