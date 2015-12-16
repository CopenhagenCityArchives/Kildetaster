module.exports = {
    
    options: {
        
        dest: '<%= package.resources %>/js/app/shared/constants.js',
        name: 'constants'
    },

    prototype: {
        constants: {
            EDITORURL: 'http://localhost:1508',
            JSONURL: '/resources/mock/'
        }
    },

    development: {
        constants: {
            EDITORURL: 'http://localhost:1508',
            JSONURL: '/resources/mock/'
        }
    },

    production: {
        constants: {
            EDITORURL: 'http://kildetaster.dev9.1508test.dk',
            JSONURL: 'http://kildetaster.dev9.1508test.dk/resources/mock/'
        }
    }
};