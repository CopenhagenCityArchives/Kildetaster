export default galleryDirective;
function galleryDirective() {
    return {
        restrict: 'E',

        scope: {
            images: '='
        },

        template: require('./gallery.directive.tpl.html'),

    }
}