define([

],
function() {

    var startsWithFilter = function() {

        /**
        * Filter out all items that does not have a specifik propertyName that starts with the search criteria
        *
        * @param array {array} The array of objects to search through
        * @param search {string} The search term
        * @param propertyName {string} The property name in each object to search in
        *
        * @returns {array} The results that match
        */
        return function(array, search, propertyName) {

            var matches = [];
            for(var i = 0; i < array.length; i++) {

                if (array[i][propertyName].indexOf(search) === 0 && search.length < array[i][propertyName].length) {
                    matches.push(array[i]);
                }
            }
            return matches;
        };
    };

    return startsWithFilter;

});