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
            SOLRAPI: 'https://kbhkilder.dk/1508/experimental/search',
            SEARCHCONFIGURL: 'https://kbhkilder.dk/1508/experimental/searchconfig',
            ERRORREPORCONFIGURL: 'https://kbhkilder.dk/1508/experimental/errorreportconfig',
            //API: 'http://www.kbhkilder.dk/1508/experimental',
            MAINDOMAIN: 'https://www.kbharkiv.dk',
            TOKENURL: 'https://www.kbharkiv.dk/index.php?option=authorize&response_type=token&client_id=kbhkilder&api=oauth2',
            ERRORURL: 'http://www.kbharkiv.dk/deltag/indtast-data-fra-arkivmateriale',
            SEARCHURL: 'http://www.kbharkiv.dk/sog-i-arkivet/sog-efter-personer',
            BYPASSAUTH: false,
            //Number of items to fetch when working with typeahead data fields
            TYPEAHEADMAXIUMUM: 75
        }
    },

    prototypeNoAuth: {
        constants: {
            JSONURL: '/resources/mock/',
            EDITORURL: 'http://localhost:1508',
            RESSOURCEURL: '/resources/',
            SDKCSSURL: '/resources/css/sdk.css',
            //API: 'http://www.kbhkilder.dk/1508/stable',
            //API: 'http://www.kbhkilder.dk/1508/stable_noauth',
            API: 'http://www.kbhkilder.dk/1508/experimental',
            SOLRAPI: 'https://kbhkilder.dk/1508/experimental/search',
            SEARCHCONFIGURL: 'https://kbhkilder.dk/1508/experimental/searchconfig',
            ERRORREPORCONFIGURL: 'https://kbhkilder.dk/1508/experimental/errorreportconfig',
            MAINDOMAIN: 'https://www.kbharkiv.dk',
            TOKENURL: 'https://www.kbharkiv.dk/index.php?option=authorize&response_type=token&client_id=kbhkilder&api=oauth2',
            ERRORURL: 'http://www.kbharkiv.dk/deltag/indtast-data-fra-arkivmateriale',
            SEARCHURL: 'http://www.kbharkiv.dk/sog-i-arkivet/sog-efter-personer',
            BYPASSAUTH: true,
            //Number of items to fetch when working with typeahead data fields
            TYPEAHEADMAXIUMUM: 75
        }
    },

    development: {
        constants: {
            JSONURL: 'http://kildetaster.dev9.1508test.dk/resources/mock/',
            EDITORURL: '/kildetaster-development',
            RESSOURCEURL: 'http://www.kbhkilder.dk/software/kildetaster-development/resources/',
            SDKCSSURL: 'http://www.kbhkilder.dk/software/kildetaster-development/resources/css/sdk.css',
            API: 'http://www.kbhkilder.dk/1508/experimental',
            SOLRAPI: 'https://kbhkilder.dk/1508/experimental/search',
            SEARCHCONFIGURL: 'https://kbhkilder.dk/1508/experimental/searchconfig',
            ERRORREPORCONFIGURL: 'https://kbhkilder.dk/1508/experimental/errorreportconfig',
            MAINDOMAIN: 'https://www.kbharkiv.dk',
            TOKENURL: 'https://www.kbharkiv.dk/index.php?option=authorize&response_type=token&client_id=kbhkilder&api=oauth2',
            ERRORURL: 'http://www.kbharkiv.dk/deltag/indtast-data-fra-arkivmateriale',
            SEARCHURL: 'http://www.kbharkiv.dk/sog-i-arkivet/sog-efter-personer',
            BYPASSAUTH: false,
            //Number of items to fetch when working with typeahead data fields
            TYPEAHEADMAXIUMUM: 75
        }
    },

    production: {
        constants: {
            JSONURL: 'http://kildetaster.dev9.1508test.dk/resources/mock/',
            EDITORURL: '/kildetaster',
            RESSOURCEURL: 'http://www.kbhkilder.dk/software/kildetaster/resources/',
            SDKCSSURL: 'http://www.kbhkilder.dk/software/kildetaster/resources/css/sdk.css',
            API: 'http://www.kbhkilder.dk/1508/stable',
            SOLRAPI: 'https://kbhkilder.dk/api/search',
            SEARCHCONFIGURL: 'https://kbhkilder.dk/1508/experimental/searchconfig',
            ERRORREPORCONFIGURL: 'https://kbhkilder.dk/1508/experimental/errorreportconfig',
            MAINDOMAIN: 'https://www.kbharkiv.dk',
            TOKENURL: 'https://www.kbharkiv.dk/index.php?option=authorize&response_type=token&client_id=kbhkilder&api=oauth2',
            ERRORURL: 'http://www.kbharkiv.dk/deltag/indtast-data-fra-arkivmateriale',
            SEARCHURL: 'http://www.kbharkiv.dk/sog-i-arkivet/sog-efter-personer',
            BYPASSAUTH: false,
            //Number of items to fetch when working with typeahead data fields
            TYPEAHEADMAXIUMUM: 75
        }
    }
};
