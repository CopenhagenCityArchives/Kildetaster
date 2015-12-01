module.exports = {

    options: {
        //Use <% and %>
        parsePattern: /\<\%\s?([\.\-\w]*)\s?\%\>/g
    },

    prototype: {

        options: {},

        files: [{
            expand: true,
            cwd: '<%= package.html %>/',
            src: ['*.html'],
            dest: '<%= package.prototype %>',
            ext: '.html'
        }]
    },

    development: {

        options: {},

        files: [{
            src: '<%= package.html %>/index_development.html',
            dest: '<%= package.build %>/index.html'
        }]
    },

    // production: {

    //     options: {
    //     },

    //     files: [{
    //         src: '<%= package.html %>/index.html',
    //         dest: '<%= package.build %>/index.html'    
    //     }]
    // }
}
