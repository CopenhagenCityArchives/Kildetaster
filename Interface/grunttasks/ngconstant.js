module.exports = {
    
    options: {
        
        dest: '<%= package.resources %>/js/app/shared/constants.js',
        name: 'constants'
    },

    prototype: {
        constants: {
            EDITORURL: 'http://localhost:1508',
            JSONURL: '/resources/mock/',
            SDKCSSURL: '/resources/css/sdk.css'
        }
    },

    development: {
        constants: {
            EDITORURL: 'http://localhost:1508',
            JSONURL: '/resources/mock/',
            SDKCSSURL: 'http://localhost:1508/resources/css/sdk.css'
        }
    },

    production: {
        constants: {
            EDITORURL: 'http://kildetaster.dev9.1508test.dk',
            JSONURL: 'http://kildetaster.dev9.1508test.dk/resources/mock/',
            SDKCSSURL: 'http://kildetaster.dev9.1508test.dk/resources/css/sdk.css'
        }
    }
};