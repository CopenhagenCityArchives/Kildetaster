module.exports = {

    options: {
        base: 'Interface/resources/js/app',
        module: 'templates',
        amd: true,
        // rename: function(moduleName) {
        //     return moduleName;
        // }

    },

    editor: {
        src: [
            '<%= package.resources %>/**/*.tpl.html',
            '!<%= package.resources %>/js/app/sdk/**/*.tpl.html'
        ],
        dest: '<%= package.resources %>/js/app/shared/templates.js'
    },

    sdk: {
        options: {
            module: 'sdk-templates'
        },
        src: [
            '<%= package.resources %>/**/*.tpl.html',
            '!<%= package.resources %>/js/app/editor/**/*.tpl.html'
        ],
        dest: '<%= package.resources %>/js/app/shared/sdk-templates.js'
    }

};
