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
            API: 'http://www.kbhkilder.dk/1508/stable',
            //API: 'http://www.kbhkilder.dk/1508/experimental',
            MAINDOMAIN: 'http://www.kbharkiv.dk',
            TOKENURL: 'http://www.kbharkiv.dk/index.php?option=authorize&response_type=token&client_id=kbhkilder&api=oauth2',
            ERRORURL: 'http://www.kbharkiv.dk/deltag/indtast-data-fra-arkivmateriale',
            SEARCHURL: 'http://www.kbharkiv.dk/sog-i-arkivet/sog-efter-personer',
            BYPASSAUTH: false
        }
    },

    prototypeNoAuth: {
        constants: {
            JSONURL: '/resources/mock/',
            EDITORURL: 'http://localhost:1508',
            RESSOURCEURL: '/resources/',
            SDKCSSURL: '/resources/css/sdk.css',
            API: 'http://www.kbhkilder.dk/1508/stable',
            //API: 'http://www.kbhkilder.dk/1508/stable_noauth',
            //API: 'http://www.kbhkilder.dk/1508/experimental',
            MAINDOMAIN: 'http://www.kbharkiv.dk',
            TOKENURL: 'http://www.kbharkiv.dk/index.php?option=authorize&response_type=token&client_id=kbhkilder&api=oauth2',
            ERRORURL: 'http://www.kbharkiv.dk/deltag/indtast-data-fra-arkivmateriale',
            SEARCHURL: 'http://www.kbharkiv.dk/sog-i-arkivet/sog-efter-personer',
            BYPASSAUTH: true
        }
    },

    development: {
        constants: {
            JSONURL: '/resources/mock/',
            EDITORURL: 'http://kbharkiv.dk/kildetaster',
            RESSOURCEURL: 'http://kbhkilder.dk/software/kildetaster/resources/',
            SDKCSSURL: 'http://kbhkilder.dk/software/kildetaster/resources/css/sdk.css',
            API: 'http://www.kbhkilder.dk/1508/stable',
            //API: 'http://www.kbhkilder.dk/1508/experimental',
            MAINDOMAIN: 'http://www.kbharkiv.dk',
            TOKENURL: 'http://www.kbharkiv.dk/index.php?option=authorize&response_type=token&client_id=kbhkilder&api=oauth2',
            ERRORURL: 'http://www.kbharkiv.dk/deltag/indtast-data-fra-arkivmateriale',
            SEARCHURL: 'http://www.kbharkiv.dk/sog-i-arkivet/sog-efter-personer',
            BYPASSAUTH: false
        }
    },

    production: {
        constants: {
            JSONURL: 'http://kildetaster.dev9.1508test.dk/resources/mock/',
            EDITORURL: '/kildetaster',
            RESSOURCEURL: 'http://www.kbhkilder.dk/software/kildetaster/resources/',
            SDKCSSURL: 'http://www.kbhkilder.dk/software/kildetaster/resources/css/sdk.css',
            API: 'http://www.kbhkilder.dk/1508/stable',
            MAINDOMAIN: 'http://www.kbharkiv.dk',
            TOKENURL: 'http://www.kbharkiv.dk/index.php?option=authorize&response_type=token&client_id=kbhkilder&api=oauth2',
            ERRORURL: 'http://www.kbharkiv.dk/deltag/indtast-data-fra-arkivmateriale',
            SEARCHURL: 'http://www.kbharkiv.dk/sog-i-arkivet/sog-efter-personer',
            BYPASSAUTH: false
        }
    }
};
