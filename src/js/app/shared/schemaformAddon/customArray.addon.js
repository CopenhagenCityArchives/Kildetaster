define([

    'angular',
    'angular-schema-form',
    'angular-schema-form-bootstrap'

], function(ang, sf, sfbootstrap) {

    var schemaForm = angular.module('schemaForm');

    schemaForm.controller('sfCustomArray', ['$scope', '$element', '$timeout', function($scope, $element, $timeout) {

        /**
        * Add item to array, proxy function to do custom logic when calling
        * schemaForm default add functionality
        *
        * @param callback {function} The default schemaform add function
        * @param event {event} An angular click event object
        */
        $scope.add = function add(callback, event) {

            //Timeout to match the default animation duration for ng-enter, @see _list-group-item.scss
            var timeout = 210;

            if (callback && angular.isFunction(callback)) {

                //Call the default click function
                callback();

                //Give angular time to add the new item and make it available in the dom
                $timeout(function() {

                    var selectController, elm,

                        //locate the list-group items in the dom node we are working on
                        listElements = $(event.currentTarget).closest('.schema-form-array').find('.list-group-item');

                    //Get the last element if we can
                    if (listElements.length > 0) {

                        elm = listElements[listElements.length -1];

                        //get a reference to the custom typeahead
                        selectController = $(elm).find('sf-decorator:first .ui-select-match').controller('uiSelect');

                        //Force the typeahead to open, and focus the search input in it
                        $timeout(function() {

                            selectController.activate(false, true);

                            //Give the directive time to activate
                            $scope.$apply();

                            //Focus the input
                            selectController.focusSearchInput();
                        }, timeout);
                    }

                });



            }

        }
    }]);

    schemaForm.config(['schemaFormDecoratorsProvider', 'sfBuilderProvider', function(schemaFormDecoratorsProvider, sfBuilderProvider) {

        //Define a custom decorator for array type constructs. We need to be able to change the html
        //The template is more or less the default one, exepct that we explicitly remove the 'Remove' button
        //From the tabindex
        schemaFormDecoratorsProvider.defineAddOn(
            'bootstrapDecorator', // Name of the decorator you want to add to.
            'array', // Form type that should render this add-on
            'schemaFormCustomArray.tpl.html', // Template name in $templateCache
            sfBuilderProvider.stdBuilders // List of builder functions to apply.
        );

    }]);

    schemaForm.run(['$templateCache', function($templateCache) {
        $templateCache.put('schemaFormCustomArray.tpl.html', require('./customArray.addon.tpl.html'));
    }])


    return function() {};

});
