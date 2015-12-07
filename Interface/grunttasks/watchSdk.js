module.exports = function(grunt) {
    grunt.registerTask('watchSdk', function() {
        // Configuration for watch:test tasks.
        var config = {

            images: {
                files: ['<%= package.resources %>/images/**/*.{png,jpg,gif,svg}'],
                tasks: ['newer:copy:sdk'],
                options: {
                    livereload: true
                },
            },

            scss: {
                files: ['<%= package.resources %>/sass/**/*.scss', '<%= package.resources %>/bower_components/**/*.scss'],
                tasks: ['newer:csscomb', 'sass:sdk'],
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
                tasks: ['newer:copy:sdk', 'karma:prototype:run'],
                options: {
                    livereload: true
                }
            },

            mock: {
                files: ['<%= package.resources %>/mock/**/*.json'],
                tasks: ['newer:copy:sdk'],
                options: {
                    livereload: true
                }
            },

            angulartemplates: {
                files: ['<%= package.resources %>/js/**/*.tpl.html'],
                tasks: ['html2js:sdk'],
                options: {
                    livereload: true
                }
            },

            fonts: {
                files: ['<%= package.resources %>/fonts/**'],
                tasks: ['newer:copy:sdk'],
                options: {
                    livereload: true
                }
            },

            preprocess: {
                files: ['<%= package.html %>/**/*.html'],
                tasks: ['bake:sdk'],
            },

            prototypeLiveReload: {
                files: ['<%= package.sdk %>/*.html'],
                options: {
                    livereload: true,
                }
            }
        };

        grunt.config('watch', config);
        grunt.task.run('watch');
    });
};