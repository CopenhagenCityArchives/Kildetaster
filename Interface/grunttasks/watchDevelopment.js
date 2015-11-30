module.exports = function(grunt) {
    grunt.registerTask('watchDevelopment', function() {
        // Configuration for watch:development tasks.
        var config = {
            images: {
                files: ['<%= package.resources %>/images/**/*.{png,jpg,gif,svg}'],
                tasks: ['newer:copy:development']
            },

            scss: {
                files: ['<%= package.resources %>/sass/**/*.scss'],
                tasks: ['newer:csscomb', 'sass:development'],
            },

            js: {
                files: ['<%= package.resources %>/js/**/*.js'],
                tasks: ['requirejs:development'],
            },

            jsstandalone: {
                files: ['<%= package.resources %>/js/standalone/*.js'],
                tasks: ['newer:copy:development'],
                options: {
                    livereload: true
                }
            },

            fonts: {
                files: ['<%= package.resources %>/fonts/**'],
                tasks: ['newer:copy:development'],
            }
        };

        grunt.config('watch', config);
        grunt.task.run('watch');
    });
};