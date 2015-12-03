define([

    'openseadragon'

], function() {

    var editorController = function editorController($scope, projectData) {

        $scope.options = {

            tileSources: {
                type: 'image',
                url: projectData.imageUrl,
                navigatorPosition: 'TOP_LEFT'
            }

        };
        
    };

    return editorController;

});