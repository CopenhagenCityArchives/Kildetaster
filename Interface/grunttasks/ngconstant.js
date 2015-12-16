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
            EDITORURL: 'DEVTODO',
            JSONURL: '/resources/mock/'
        }
    },

    production: {
        constants: {
            EDITORURL: 'PRODTODO',
            JSONURL: 'http://kildetaster.dev9.1508test.dk/resources/mock/'
        }
    }
};