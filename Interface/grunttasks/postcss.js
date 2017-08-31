module.exports = {

    options: {
        // inline sourcemaps
        map: true,

        // or
        /*
        map: {
            inline: false, // save all sourcemaps as separate files...
            annotation: 'dist/css/maps/' // ...to the specified directory
        },
        */

    },

    prototype: {

        options: {
            processors: [
                // add vendor prefixes
                require('autoprefixer')({
                    browsers: 'last 2 versions'
                }),
                require('postcss-assets')({
                    loadPaths: ['/resources/images/'],
                    basePath: '_prototype/'
                })
            ]
        },

        src: '<%= package.prototyperesources %>/css/styles.css',
        dest: '<%= package.prototyperesources %>/css/styles.css'
    },

    sdk: {
        options: {
            processors: [
                // add vendor prefixes
                require('autoprefixer')({
                    browsers: 'last 2 versions'
                }),
                require('postcss-assets')({
                    loadPaths: ['/resources/images/'],
                    basePath: '_sdk/'
                }),
                // minify the result
                //require('cssnano')()
            ]
        },
        src: '<%= package.sdkresources %>/css/sdk.css',
        dest: '<%= package.sdkresources %>/css/sdk.css'
    },

    development: {
        options: {
            processors: [
                // add vendor prefixes
                require('autoprefixer')({
                    browsers: 'last 2 versions'
                }),
                require('postcss-assets')({
                    loadPaths: ['/resources/images/'],
                    basePath: 'kbh/'
                }),
                // minify the result
                //require('cssnano')()
            ]
        },
        files: [{
            src: '<%= package.buildresources %>/css/styles.css',
            dest: '<%= package.buildresources %>/css/styles.css'
        }, {
            src: '<%= package.buildresources %>/css/sdk.css',
            dest: '<%= package.buildresources %>/css/sdk.css'
        }]
    },

    production: {
        options: {
            processors: [
                // add vendor prefixes
                require('autoprefixer')({
                    browsers: 'last 2 versions'
                }),
                require('postcss-assets')({
                    loadPaths: ['/resources/images/'],
                    basePath: 'kbh/'
                }),
                // minify the result
                require('cssnano')()
            ]
        },
        files: [{
            src: '<%= package.buildresources %>/css/styles.css',
            dest: '<%= package.buildresources %>/css/styles.css'
        }, {
            src: '<%= package.buildresources %>/css/sdk.css',
            dest: '<%= package.buildresources %>/css/sdk.css'
        }]

    }
};
