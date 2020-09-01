module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.loadNpmTasks("grunt-jsbeautifier");

    grunt.loadNpmTasks('grunt-wiredep');

    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.loadNpmTasks('grunt-replace');

    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.loadNpmTasks('grunt-ftp-deploy');

    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.loadNpmTasks('grunt-html2js');

    require('time-grunt')(grunt);

    grunt.config.init({

        env: {
            libUrl: 'http://kbhkilder.dk/software/apacs_datasource_editor',
        },

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

        copy: {
            htaccess: {
                files: [{
                    expand: false,
                    src: ['.htaccess'],
                    dest: 'build/html/',
                    filter: 'isFile'
                }, ],
            },
        },

        /*replace: {
            task: {
                src: 'index.html',
                dest: 'build/html/index_build.html',
                overwrite: false,
                replacements: [{
                        from: /<!-- bower:css -->(.|\n|\w)*?<!-- endbower -->/,
                        to: '<link rel="stylesheet" href="build/css.min.css">'
                    },
                    {
                        from: /<!-- bower:js -->(.|\n)*?<!-- endbower -->/,
                        to: '<script src="build/js.min.js"></script>'
                    }
                ]
            }
        },*/

        replace: {
            dist: {
                options: {
                    patterns: [{
                            match: /(<!-- bower:css -->)((\s|.)*?)(<!-- endbower -->)/g,
                            replacement: '<link rel="stylesheet" href="<%= env.libUrl %>/css.min.css">'
                        },
                        {
                            match: /(<!-- bower:js -->)((\s|.)*?)(<!-- endbower -->)/g,
                            replacement: '<script src="<%= env.libUrl %>/js.min.js"></script>'
                        },
                        {
                            match: /(<script src="build\/app\.js"><\/script>)/g,
                            replacement: '<script src="<%= env.libUrl %>/app.js"></script>'
                        }
                    ]
                },
                files: [{
                    expand: true,
                    flatten: true,
                    src: ['index.html'],
                    dest: 'build/html/'
                }]
            }
        },

        watch: {
            js: {
                files: ['js/*.js', '!js/templates.js'],
                tasks: ['clean:build', 'html2js:task', 'concat:main', 'jsbeautifier', 'wiredep:task', 'bower-bundler', 'replace:dist', 'clean:templates']
            }
        },

        clean: {
            build: ['build/'],
            templates: ['js/templates.js']
        },

        'ftp-deploy': {
            source: {
                auth: {
                    host: 'phhw-140602.cust.powerhosting.dk',
                    port: 21,
                    authKey: 'kbhkilder'
                },
                forceVerbose: true,
                src: 'build/',
                dest: 'public_html/software/apacs_datasource_editor',
                exclusions: ['build/html']
            },
            frontend: {
                auth: {
                    host: 'kbharkiv.dk',
                    port: 21,
                    authKey: 'kbharkiv'
                },
                forceVerbose: true,
                src: ['build/html'],
                dest: 'public_html/datalister',
                exclusions: []
            }
        },
        'html2js': {
            options: {
                base: './',
                //            module: 'templates',
                amd: false
                // rename: function(moduleName) {
                //     return moduleName;
                // }

            },

            task: {
                src: [
                    'partials/*.html',
                ],
                dest: 'js/templates.js'
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

        console.log('Got the following CSS files from bower install: ', result.css);
        console.log('Got the following JS files from bower install: ', result.js);
    });

    //Replace bower sources with concatted js and css files
    grunt.registerTask('build', ['clean:build', 'html2js:task', 'concat:main', 'jsbeautifier', 'wiredep:task', 'bower-bundler', 'replace:dist', 'clean:templates']);
    grunt.registerTask('test', ['wiredep:task', 'bower-bundler']);
    //Default: Watch as js files
    grunt.registerTask('default', ['watch:js']);

    //Same as watch:js, but without watching...
    grunt.registerTask('build-dev', ['clean:build', 'html2js:task', 'concat:main', 'jsbeautifier', 'wiredep:task', 'replace:dist', 'clean:templates']);

    grunt.registerTask('deploy', ['copy:htaccess', 'replace:dist', 'ftp-deploy:source', 'ftp-deploy:frontend']);
};
