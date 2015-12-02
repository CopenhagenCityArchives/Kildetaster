define([

    'openseadragon'

], function() {

    var editorController = function editorController($scope) {

        $scope.image = '/resources/images/temporary/page_01.jpg';
        

            


        $scope.options = {

            tileSources: {
                type: 'image',
                url: $scope.image,
                navigatorPosition: 'TOP_LEFT'
            }

        };

        $scope.$on('selectionEnabled', function() {
            console.log('setting position')
            $scope.options.navigatorPosition = 'BOTTOM_RIGHT';
            $scope.options.url = '/resources/images/temporary/page_02.jpg';
        })

    };

    return editorController;

});
