module.exports = {
    
    options: {
        dest: '<%= package.resources %>/js/app/shared/constants.js',
        name: 'constants'
    },

    prototype: {
        constants: {
            JSONURL: '/resources/mock/',
            EDITORURL: 'http://localhost:1508',
            SDKCSSURL: '/resources/css/sdk.css',
            API: 'http://kbhkilder.dk/1508/stable',
            MAINDOMAIN: 'http://kbharkiv.bo.intern.redweb.dk',
            TOKENURL: 'http://kbharkiv.bo.intern.redweb.dk/index.php?option=authorize&response_type=token&client_id=kbhkilder&api=oauth2'
        }
    },

    development: {
        constants: {
            JSONURL: '/resources/mock/',
            EDITORURL: 'http://kbharkiv.dk/kildetaster',
            SDKCSSURL: 'http://localhost:1508/resources/css/sdk.css',
            API: 'http://kbhkilder.dk/1508/stable',
            MAINDOMAIN: 'http://kbharkiv.bo.intern.redweb.dk',
            TOKENURL: 'http://kbharkiv.bo.intern.redweb.dk/index.php?option=authorize&response_type=token&client_id=kbhkilder&api=oauth2'
        }
    },

    production: {
        constants: {
            JSONURL: 'http://kildetaster.dev9.1508test.dk/resources/mock/',
            EDITORURL: 'http://kbharkiv.dk/kildetaster',
            SDKCSSURL: 'http://kbhkilder.dk/software/kildetaster/resources/css/sdk.css',
            API: 'http://kbhkilder.dk/1508/stable',
            MAINDOMAIN: 'http://kbharkiv.bo.intern.redweb.dk',
            TOKENURL: 'http://kbharkiv.bo.intern.redweb.dk/index.php?option=authorize&response_type=token&client_id=kbhkilder&api=oauth2'
        }
    }
};