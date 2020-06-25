define([

], function() {
        
    var galleryDirective = ['EDITOR_URL', function galleryDirective(EDITOR_URL) {
        return {
            restrict: 'E',

            scope: {
                images: '=',
                data: '=',
            },

            template: require('./gallery.directive.tpl.html'),
            
            link: function(scope, element, attr) {
                
                scope.imageNum = scope.images.length;
                console.log('imageNum');
                console.log(scope.imageNum);
                scope.editorUrl = EDITOR_URL + '#/task/' + scope.data.task_id + '/page/' + scope.data.page_id + '/post/' + scope.data.post_id;
            }
        }
    }];

    return galleryDirective;
});