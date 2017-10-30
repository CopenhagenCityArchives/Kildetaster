module.exports = {

    prototype: {
        files: [{
            //Fonts
            expand: true,
            cwd: '<%= package.resources %>/fonts/',
            src: '**',
            dest: '<%= package.prototyperesources %>/fonts'
        }, {
            //Javascript
            expand: true,
            cwd: '<%= package.resources %>/js/',
            //All javascript files, except the test files
            src: ['**/*.{js,map}', '!test/**/*.js'],
            dest: '<%= package.prototyperesources %>/js'
        }, {
            //Images
            expand: true,
            cwd: '<%= package.resources %>/images/',
            src: ['**/*.{png,jpg,gif,svg}'],
            dest: '<%= package.prototyperesources %>/images'

        }, {
            //Bower components
            expand: true,
            cwd: '<%= package.resources %>/bower_components/',
            src: ['**/*.*'],
            dest: '<%= package.prototyperesources %>/bower_components'

        }, {
            //Mock data
            expand: true,
            cwd: '<%= package.resources %>/mock/',
            src: ['**/*.json'],
            dest: '<%= package.prototyperesources %>/mock'
        }]
    },

    sdk: {
        files: [{
            //Javascript
            expand: true,
            cwd: '<%= package.resources %>/js/',
            //All javascript files, except the test files
            src: ['**/*.{js,map}', '!test/**/*.js'],
            dest: '<%= package.sdkresources %>/js'
        }, {
            //Images
            expand: true,
            cwd: '<%= package.resources %>/images/',
            src: ['**/*.{png,jpg,gif,svg}'],
            dest: '<%= package.sdkresources %>/images'

        }, {
            //Bower components
            expand: true,
            cwd: '<%= package.resources %>/bower_components/',
            src: ['**/*.*'],
            dest: '<%= package.sdkresources %>/bower_components'

        }, {
            // Search configuration
            expand: true,
            cwd: '<%= package.configs %>/search/',
            src: ['**/*.json'],
            dest: '<%= package.sdkresources %>/configs'
        }, {
            //Mock data
            expand: true,
            cwd: '<%= package.resources %>/mock/',
            src: ['**/*.json'],
            dest: '<%= package.sdkresources %>/mock'
        }, {
        	//dump files
        	expand: true,
        	cwd: '<%= package.html %>/dump/index_files/',
        	src: ['**/*.*'],
        	dest: '<%= package.sdkresources %>/dump_files'
        },{
            //.htaccess files for resources
            expand: true,
            cwd: '<%= package.resources %>/',
            src: ['.htaccess'],
            dest: '<%= package.sdkresources %>/'
        },{
            //.htaccess files for configs
            expand: true,
            cwd: '<%= package.resources %>/',
            src: ['.htaccess'],
            dest: '<%= package.sdkresources %>/configs'
        }
    ]
    },

    development: {
        files: [{
            //Fonts
            expand: true,
            cwd: '<%= package.resources %>/fonts/',
            src: '**',
            dest: '<%= package.buildresources %>/fonts'
        }, {
            // Search configuration
            expand: true,
            cwd: '<%= package.configs %>/search/',
            src: ['**/*.json'],
            dest: '<%= package.buildresources %>/configs'
        }, {
            //Images
            expand: true,
            cwd: '<%= package.resources %>/images/',
            src: ['**/*.{png,jpg,gif,svg}'],
            dest: '<%= package.buildresources %>/images'

        },{
            //.htaccess files for resources
            expand: true,
            cwd: '<%= package.resources %>/',
            src: ['.htaccess'],
            dest: '<%= package.buildresources %>/'

        },{
            //.htaccess files for configs
            expand: true,
            cwd: '<%= package.resources %>/',
            src: ['.htaccess'],
            dest: '<%= package.buildresources %>/configs'
        },{
            //Mock data
            expand: true,
            cwd: '<%= package.resources %>/mock/',
            src: ['**/*.json'],
            dest: '<%= package.buildresources %>/mock'
        }]
    },

    production: {

        files: [{
            //Fonts
            expand: true,
            cwd: '<%= package.resources %>/fonts/',
            src: '**',
            dest: '<%= package.buildresources %>/fonts'
        }, {
            // Search configuration
            expand: true,
            cwd: '<%= package.configs %>/search/',
            src: ['**/*.json'],
            dest: '<%= package.buildresources %>/configs'
        }, {
            //Images
            expand: true,
            cwd: '<%= package.resources %>/images/',
            src: ['**/*.{png,jpg,gif,svg}'],
            dest: '<%= package.buildresources %>/images'

        },{
            //.htaccess files for resources
            expand: true,
            cwd: '<%= package.resources %>/',
            src: ['.htaccess'],
            dest: '<%= package.buildresources %>/'

        },{
            //.htaccess files for configs
            expand: true,
            cwd: '<%= package.resources %>/',
            src: ['.htaccess'],
            dest: '<%= package.buildresources %>/configs'
        }]
    },

};
