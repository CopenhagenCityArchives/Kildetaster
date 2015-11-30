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
    development: {
        options:{
            sourceMap: true,
            outputStyle: 'nested',
            imagePath: '<%= package.buildresources %>/images'
        },
        files: {
            '<%= package.buildresources %>/css/styles.css': '<%= package.resources %>/sass/styles.scss'
        }
    },
    production: {
        options:{
            sourceMap: false,
            outputStyle: 'compressed',
            imagePath: '<%= package.buildresources %>/images'
        },
        files: {
            '<%= package.buildresources %>/css/styles.css': '<%= package.resources %>/sass/styles.scss'
        }
    }

};
