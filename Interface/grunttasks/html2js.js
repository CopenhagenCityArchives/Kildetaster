module.exports = {
    
    options: {
        base: 'Interface/resources/js/app',
        module: 'templates',
        amd: true,
        // rename: function(moduleName) {            
        //     return moduleName;
        // }
        
    },

    prototype: {
        src: ['<%= package.resources %>/**/*.tpl.html', '!<%= package.resources %>/js/app/sdk/**/*.tpl.html'],
        dest: '<%= package.resources %>/js/app/shared/templates.js'
    },

    sdk: {
        options: {
            module: 'sdk-templates'
        },
        src: ['<%= package.resources %>/js/app/shared/**/*.tpl.html', '<%= package.resources %>/js/app/sdk/**/*.tpl.html'],
        dest: '<%= package.sdkresources %>/js/app/shared/sdk-templates.js'
    },

    production: {
        src: ['<%= package.resources %>/**/*.tpl.html'],
        dest: '<%= package.resources %>/js/app/shared/templates.js'  
    }
};