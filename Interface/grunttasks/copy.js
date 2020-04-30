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
            //Fonts
            expand: true,
            cwd: '<%= package.resources %>/fonts/',
            src: '**',
            dest: '<%= package.sdkresources %>/fonts'
        }, {
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

        },{
            //Mock data
            expand: true,
            cwd: '<%= package.resources %>/mock/',
            src: ['**/*.json'],
            dest: '<%= package.sdkresources %>/mock'
        }, {
        	//dump files
        	expand: true,
        	cwd: '<%= package.html %>/dump/wordpress-kbharkiv_files/',
        	src: ['**/*.*'],
        	dest: '<%= package.sdkresources %>/wordpress-kbharkiv_files/'
        }, {
        	//dump files
        	expand: true,
        	cwd: '<%= package.html %>/dump/search_files/',
        	src: ['**/*.*'],
        	dest: '<%= package.sdkresources %>/search_files'
        },{
            //.htaccess files for resources
            expand: true,
            cwd: '<%= package.resources %>/',
            src: ['.htaccess'],
            dest: '<%= package.sdkresources %>/'
        }]
    },

    development: {
        files: [{
            //Fonts
            expand: true,
            cwd: '<%= package.resources %>/fonts/',
            src: '**',
            dest: '<%= package.buildresources %>/fonts'
        },{
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
        },{
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

        }]
    },

};
