export default galleryDirective;
function galleryDirective() {
    return {
        restrict: 'E',

        scope: {
            images: '=',
            data: '='
        },

        template: require('./gallery.directive.tpl.html'),
        

        
        
    }

}