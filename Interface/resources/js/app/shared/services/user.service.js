define([


], function() {

    var userService = /*@ngInject*/ function taskService($http) {

        var baseUrl = '/resources/mock/';

        /**
         * Randomize array element order in-place.
         * Using Durstenfeld shuffle algorithm.
         */
        function shuffleArray(array) {
            for (var i = array.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
            return array;
        }

        return {

            /**
             * Lookup a specific task
             * @param {int} the id of the task to look up
             *
             * @return {promise} That resolves with the data for the task
             */
            getUsers: function getProject(id) {

                return $http.get(baseUrl + 'users-online.json').then(function(response) {
                    return shuffleArray(response.data);
                });

            }

        };

    };

    return userService;

});
