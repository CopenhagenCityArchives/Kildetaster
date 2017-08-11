module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.loadNpmTasks("grunt-jsbeautifier");

    grunt.loadNpmTasks('grunt-wiredep');

    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.loadNpmTasks('grunt-text-replace');

    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.loadNpmTasks('grunt-ftp-deploy');

    require('time-grunt')(grunt);

    grunt.config.init({

        concat: {
            main: {
                src: [
                    'libs/*.js',
                    'js/**/*.js'
                ],
                dest: 'build/app.js'
            }
        },

        uglify: {
            main: {
                files: {

                    'build/scripts.min.js': '<%= concat.main.dest %>'
                }
            }
        },

        jsbeautifier: {
            files: ["js/**/*.js", "Gruntfile.js"],
            options: {}
        },

        wiredep: {

            task: {

                // Point to the files that should be updated when
                // you run `grunt wiredep`
                src: [
                    'index.html'
                ],

                options: {
                    // See wiredep's configuration documentation for the options
                    // you may pass:

                    // https://github.com/taptapship/wiredep#configuration
                }
            }
        },

        replace: {
            task: {
                src: ['index.html'],
                dest: 'index_build.html',
                overwrite: false,
                replacements: [{
                        from: /<!-- bower:css -->(.|\n)*?<!-- endbower -->/,
                        to: '<link rel="stylesheet" href="build/css.min.css">'
                    },
                    {
                        from: /<!-- bower:js -->(.|\n)*?<!-- endbower -->/,
                        to: '<script src="build/js.min.js"></script>'
                    }
                ]
            }
        },

        watch: {
            js: {
                files: ['js/*.js'],
                tasks: ['clean:build', 'concat:main', 'jsbeautifier', 'wiredep:task']
            }
        },

        clean: {
            build: ['build/', 'index_build.html']
        },

        'ftp-deploy': {
            build: {
                auth: {
                    host: 'phhw-140602.cust.powerhosting.dk',
                    port: 21,
                    authKey: 'kbhkilder'
                },
                forceVerbose: true,
                src: 'build/',
                dest: 'public_html/software/apacs_datasource_editor',
                exclusions: []
            }
        }
    });

    //Put all bower files in one file
    grunt.registerTask('bower-bundler', function() {
        var result = require('wiredep')({
            src: ['index.html']
        });

        grunt.config.set('concat.withWiredepJS', {
            src: [
                result.js
            ],
            dest: 'build/js.min.js'
        });

        grunt.task.run('concat:withWiredepJS');

        grunt.config.set('concat.withWiredepCSS', {
            src: [
                result.css
            ],
            dest: 'build/css.min.css'
        });
        grunt.task.run('concat:withWiredepCSS');
    });

    //Replace bower sources with concatted js and css files
    grunt.registerTask('build', ['clean:build', 'concat:main', 'jsbeautifier', 'wiredep:task', 'bower-bundler', 'replace:task']);

    //Default: Watch as js files
    grunt.registerTask('default', ['watch:js']);

    //Same as watch:js, but without watching...
    grunt.registerTask('build-dev', ['clean:build', 'concat:main', 'jsbeautifier', 'wiredep:task']);

    grunt.registerTask('deploy', ['ftp-deploy:build']);
};
