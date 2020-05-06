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

    sdk: {

        options: {},

        files: [{
            src: '<%= package.html %>/index_stadsdump.html',
            dest: '<%= package.sdk %>/index.html'
        }, {
            src: '<%= package.html %>/search.html',
            dest: '<%= package.sdk %>/search.html'
        }, {
            src: '<%= package.html %>/login.html',
            dest: '<%= package.sdk %>/login.html'
        }]
    },

    development: {

        options: {},

        files: [{
            src: '<%= package.html %>/index_development.html',
            dest: '<%= package.build %>/index.html'
        }
        ]
    },

    development_public_beta: {

        options: {},

        files: [{
            src: '<%= package.html %>/index_public_beta.html',
            dest: '<%= package.build %>/index.html'
        }
        ]
    },

    production: {

        options: {},

        files: [{
            src: '<%= package.html %>/index_production.html',
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
};
