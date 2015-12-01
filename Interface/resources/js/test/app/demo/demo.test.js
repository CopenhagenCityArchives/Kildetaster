define([
    
    'angular-mocks',
    'app/demo/demo'

], function(demoApp) {


    describe('demo controller', function() {
        
        beforeEach(module('demoApp'));

        var $controller;

        beforeEach(inject(function(_$controller_) {
            // The injector unwraps the underscores (_) from around the parameter names when matching
            $controller = _$controller_;
        }));

        describe('$scope.grade', function() {
            
            it('test property in scope is present', function() {
                
                var $scope = {};
                
                var controller = $controller('demoController', {
                    $scope: $scope
                });
                               
                expect($scope.hello).toEqual('world');

            });
        });
    });

});
