module.exports = {
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
			src: ['**/*.js'],
			dest: '<%= package.buildresources %>/js/standalone'
		}, {
			//Images
			expand: true,
			cwd: '<%= package.resources %>/images/',
			src: ['**/*.{png,jpg,gif,svg}', '!temporary/**'],
			dest: '<%= package.buildresources %>/images'

		}]
	},
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
			src: ['**/*.js'],
			dest: '<%= package.prototyperesources %>/js'
		}, {
			//Images
			expand: true,
			cwd: '<%= package.resources %>/images/',
			src: ['**/*.{png,jpg,gif,svg}'],
			dest: '<%= package.prototyperesources %>/images'

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
			src: ['**/*.js'],
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
