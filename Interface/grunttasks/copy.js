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

		},{
			//Bower components
			expand: true,
			cwd: '<%= package.resources %>/bower_components/',
			src: ['**/*.*'],
			dest: '<%= package.prototyperesources %>/bower_components'

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
			//Javascript
			expand: true,
			cwd: '<%= package.resources %>/js/standalone/',
			//All javascript files, except the test files
			src: ['**/*.{js,map}', '!test/**/*.js'],
			dest: '<%= package.buildresources %>/js/standalone'
		}, {
			//Images
			expand: true,
			cwd: '<%= package.resources %>/images/',
			src: ['**/*.{png,jpg,gif,svg}', '!temporary/**'],
			dest: '<%= package.buildresources %>/images'

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
			//Javascript
			expand: true,
			cwd: '<%= package.resources %>/js/standalone/',
			//All javascript files, except the test files
			src: ['**/*.{js,map}', '!test/**/*.js'],
			dest: '<%= package.buildresources %>/js/standalone'
		}, {
			//Images
			expand: true,
			cwd: '<%= package.resources %>/images/',
			src: ['**/*.{png,jpg,gif,svg}', '!temporary/**'],
			dest: '<%= package.buildresources %>/images'

		}]
	},

};
