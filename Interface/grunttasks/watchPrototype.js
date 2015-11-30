module.exports = function(grunt) {
	grunt.registerTask('watchPrototype', function() {
		// Configuration for watch:test tasks.
		var config = {

			images: {
				files: ['<%= package.resources %>/images/**/*.{png,jpg,gif,svg}'],
				tasks: ['newer:copy:prototype'],
				options: {
					livereload: true
				},
			},

			scss: {
				files: ['<%= package.resources %>/sass/**/*.scss'],
				tasks: ['newer:csscomb', 'sass:prototype'],
				options: {
					livereload: false
				},
			},
            css: {
                files: ['<%= package.prototyperesources %>/css/styles.css'],
                tasks: [],
                options: {
                    livereload: true
                }
            },
			js: {
				files: ['<%= package.resources %>/js/**/*.js'],
				tasks: ['newer:copy:prototype'],
				options: {
					livereload: true
				}
			},

			fonts: {
				files: ['<%= package.resources %>/fonts/**'],
				tasks: ['newer:copy:prototype'],
				options: {
					livereload: true
				}
			},

			preprocess: {
				files: ['<%= package.html %>/**/*.html'],
				tasks: ['preprocess'],
			},

			prototypeLiveReload: {
				files: ['<%= package.prototype %>/*.html'],
				options: {
					livereload: true,
				}
			}
		};

		grunt.config('watch', config);
		grunt.task.run('watch');
	});
};