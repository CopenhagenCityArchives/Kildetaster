module.exports = {
    
    options: {
        
        dest: '<%= package.resources %>/js/app/shared/constants.js',
        name: 'constants'
    },

    prototype: {
        constants: {
            EDITORURL: 'http://localhost:1508',
            JSONURL: '/resources/mock/',
            SDKCSSURL: '/resources/css/sdk.css',
            API: 'http://kbhkilder.dk/1508/stable'
        }
    },

    development: {
        constants: {
            EDITORURL: 'http://localhost:1508',
            JSONURL: '/resources/mock/',
            SDKCSSURL: 'http://localhost:1508/resources/css/sdk.css',
            API: 'http://kbhkilder.dk/1508/stable'
        }
    },

    production: {
        constants: {
            EDITORURL: 'http://kildetaster.dev9.1508test.dk',
            JSONURL: 'http://kildetaster.dev9.1508test.dk/resources/mock/',
            SDKCSSURL: 'http://kbhkilder.dk/software/kildetaster/resources/css/sdk.css',
            API: 'http://kbhkilder.dk/1508/stable'
        }
    }
};