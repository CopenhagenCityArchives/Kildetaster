module.exports = {
    prototype: {
        options:{
            sourceMap: true,
            outputStyle: 'nested',
            imagePath: '<%= package.prototyperesources %>/images'
        },
        files: {
            '<%= package.prototyperesources %>/css/styles.css': '<%= package.resources %>/sass/styles.scss'
        }
    },

    sdk: {
        options:{
            sourceMap: true,
            outputStyle: 'nested',
            imagePath: '<%= package.sdkresources %>/images'
        },
        files: {
            '<%= package.sdkresources %>/css/sdk.css': '<%= package.resources %>/sass/sdk-styles.scss'
        }
    },

    development: {
        options:{
            sourceMap: true,
            outputStyle: 'nested',
            imagePath: '<%= package.buildresources %>/images'
        },
        files: {
            '<%= package.buildresources %>/css/styles.css': '<%= package.resources %>/sass/styles.scss',
            '<%= package.buildresources %>/css/sdk.css': '<%= package.resources %>/sass/sdk-styles.scss'
        }
    },
    production: {
        options:{
            sourceMap: false,
            outputStyle: 'nested', //compressed
            imagePath: '<%= package.buildresources %>/images'
        },
        files: {
            '<%= package.buildresources %>/css/styles.css': '<%= package.resources %>/sass/styles.scss',
            '<%= package.buildresources %>/css/sdk.css': '<%= package.resources %>/sass/sdk-styles.scss'
        }
    }

};
