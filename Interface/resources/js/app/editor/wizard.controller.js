define([

], function() {
    
    var wizardController = function($scope, $rootScope) {

        $scope.formData = {};

        $scope.formData.title = "Navne";
        $scope.formData.description = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam dicta quasi nam eum quo!"

        $scope.formData.stepsTotal = 6;
        $scope.formData.currentStep = 1;

        $scope.enableSelection = function() {

            $rootScope.$broadcast('selectionEnabled');

        };

        $scope.formData.fields = [{
            labelText: 'Fornavn',
            type: 'text',
            value: '',
            helpText: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
            errorText: ''
        },{
            labelText: 'Efternavn',
            type: 'text',
            value: '',
            helpText: 'Ipsum dolor sit amet, consectetur adipisicing elit.',
            errorText: 'Something is fishy'
        }];

        $scope.nextStep = function nextStep() {
            $scope.formData.currentStep += 1;
        };

        $scope.prevStep = function prevStep() {
            $scope.formData.currentStep -= 1;
        };

    };

    return wizardController;
});