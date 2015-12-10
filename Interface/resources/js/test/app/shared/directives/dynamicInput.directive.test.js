define([

    'angular',
    'angular-mocks',

    'app/editor/editor'

], function() {

    //Basic object to populate an input
    var fieldData = {
            labelText: "Label",
            errorText: "yes",
            unreadable: false,
            value: 'hans',
            helpText: 'helptext',
            type: 'text'
        },
        //Initial value for autofocusing the field
        autofocus = false,
        //Template that should trigger the directive
        template = '<dynamic-input field-data="field" autofocus="autofocus"></dynamic-input>',

        scope, elm; 

    describe('dynamicInput.directive', function() {

        beforeEach(module('editor'));

        beforeEach(inject(function($rootScope, $compile) {

            //Prepare the scope
            scope = $rootScope;
            scope.autofocus = autofocus;
            scope.field = fieldData;

            //Compile the scope and template together, to trigger the directive to initiate
            elm = $compile(angular.element(template))(scope);
            scope.$digest();

        }));

        it('should toggle unreadable', function() {
            //Force a call to toggle
            elm.isolateScope().toggleUnreadable();
            
            expect(elm.isolateScope().field.unreadable).toEqual(true);
        });

        it('should add error class if errorText is present', function() {
            //Test class is initially set
            expect(elm.hasClass('has-error')).toEqual(true);
            //Update the value
            elm.isolateScope().field.errorText = '';
            scope.$digest();

            expect(elm.hasClass('has-error')).toEqual(false);
        });

        it('should disable the input when unreadable is set', function() {
            elm.isolateScope().field.unreadable = true;
            scope.$digest();
            expect(elm.find('input').prop('disabled')).toEqual(true);
        });

        it('should autofocus', function() {
            
            var element = elm.find('input')[0];
            
            //Spy on wether focus has been called on the element
            spyOn(element, 'focus');

            //Chante the autofocus value to true, to indicate that the field should autofocus
            elm.isolateScope().autofocus = true;
            scope.$digest();
            
            expect(element.focus).toHaveBeenCalled();
        });

    });

});
