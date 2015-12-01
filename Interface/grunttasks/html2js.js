module.exports = {
    
    options: {
        base: 'Interface/resources/js/',
        module: 'templates',
        amd: true,
        // rename: function(moduleName) {            
        //     return moduleName;
        // }
        
    },

    prototype: {
        src: ['<%= package.resources %>/**/*.tpl.html'],
        dest: '<%= package.resources %>/js/app/shared/templates.js'
    },

    production: {
        src: ['<%= package.resources %>/**/*.tpl.html'],
        dest: '<%= package.resources %>/js/app/shared/templates.js'  
    }
}