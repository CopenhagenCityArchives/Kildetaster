module.exports = {
    
    options: {
        dest: '<%= package.resources %>/js/app/shared/constants.js',
        name: 'constants'
    },

    prototype: {
        constants: {
            JSONURL: '/resources/mock/',
            EDITORURL: 'http://localhost:1508',
            RESSOURCEURL: '/resources/',
            SDKCSSURL: '/resources/css/sdk.css',
            API: 'http://kbhkilder.dk/1508/stable',
            MAINDOMAIN: 'http://kbharkiv.bo.intern.redweb.dk',
            TOKENURL: 'http://kbharkiv.bo.intern.redweb.dk/index.php?option=authorize&response_type=token&client_id=kbhkilder&api=oauth2',
            ERRORURL: 'http://kbharkiv.dk/deltag/indtast-data-fra-arkivmateriale',
            SEARCHURL: 'http://kbharkiv.bo.intern.redweb.dk/sog-i-arkivet/sog-efter-personer'
        }
    },

    development: {
        constants: {
            JSONURL: '/resources/mock/',
            EDITORURL: 'http://kbharkiv.dk/kildetaster',
            RESSOURCEURL: 'http://localhost:1508/resources/',
            SDKCSSURL: 'http://localhost:1508/resources/css/sdk.css',
            API: 'http://kbhkilder.dk/1508/stable',
            MAINDOMAIN: 'http://kbharkiv.bo.intern.redweb.dk',
            TOKENURL: 'http://kbharkiv.bo.intern.redweb.dk/index.php?option=authorize&response_type=token&client_id=kbhkilder&api=oauth2',           
            ERRORURL: 'http://kbharkiv.dk/deltag/indtast-data-fra-arkivmateriale',
            SEARCHURL: 'http://kbharkiv.bo.intern.redweb.dk/sog-i-arkivet/sog-efter-personer'
        }
    },

    production: {
        constants: {
            JSONURL: 'http://kildetaster.dev9.1508test.dk/resources/mock/',
            EDITORURL: '/kildetaster',
            RESSOURCEURL: 'http://kbhkilder.dk/software/kildetaster/resources/',
            SDKCSSURL: 'http://kbhkilder.dk/software/kildetaster/resources/css/sdk.css',
            API: 'http://kbhkilder.dk/1508/stable',
            MAINDOMAIN: 'http://kbharkiv.bo.intern.redweb.dk',
            TOKENURL: 'http://kbharkiv.bo.intern.redweb.dk/index.php?option=authorize&response_type=token&client_id=kbhkilder&api=oauth2',
            ERRORURL: 'http://kbharkiv.dk/deltag/indtast-data-fra-arkivmateriale',
            SEARCHURL: 'http://kbharkiv.bo.intern.redweb.dk/sog-i-arkivet/sog-efter-personer'
        }
    }
};