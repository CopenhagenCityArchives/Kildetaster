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
            API: 'https://www.kbhkilder.dk/api',
            SOLRAPI: 'https://aws.kbhkilder.dk/solr/apacs_core/select',
            SEARCHCONFIGURL: 'https://www.kbhkilder.dk/1508/experimental/searchconfig',
            ERRORREPORCONFIGURL: 'https://www.kbhkilder.dk/1508/experimental/errorreportconfig',
            MAINDOMAIN: 'https://www.kbharkiv.dk',
            TOKENURL: 'https://www.kbharkiv.dk/index.php?option=authorize&response_type=token&client_id=kbhkilder&api=oauth2',
            ERRORURL: 'https://www.kbharkiv.dk/deltag/indtast-data-fra-arkivmateriale',
            SEARCHURL: 'https://www.kbharkiv.dk/permalink',
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
            API: 'https://www.kbhkilder.dk/1508/experimental',
            SOLRAPI: 'https://aws.kbhkilder.dk/solr/apacs_core/select',
            SEARCHCONFIGURL: 'https://www.kbhkilder.dk/1508/experimental/searchconfig',
            ERRORREPORCONFIGURL: 'https://www.kbhkilder.dk/1508/experimental/errorreportconfig',
            MAINDOMAIN: 'https://www.kbharkiv.dk',
            TOKENURL: 'https://www.kbharkiv.dk/index.php?option=authorize&response_type=token&client_id=kbhkilder&api=oauth2',
            ERRORURL: 'https://www.kbharkiv.dk/deltag/indtast-data-fra-arkivmateriale',
            SEARCHURL: 'https://www.kbharkiv.dk/permalink',
            BYPASSAUTH: true,
            //Number of items to fetch when working with typeahead data fields
            TYPEAHEADMAXIUMUM: 75
        }
    },

    localNoAuth: {
        constants: {
            JSONURL: '/resources/mock/',
            EDITORURL: 'http://localhost:1508',
            RESSOURCEURL: '/resources/',
            API: 'http://localhost:8080',
            SOLRAPI: 'http://localhost:8989/solr/apacs_core/select',
            SEARCHCONFIGURL: 'http://localhost:8080/searchconfig',
            ERRORREPORCONFIGURL: 'http://localhost:8080/errorreportconfig',
            MAINDOMAIN: 'https://www.kbharkiv.dk',
            TOKENURL: 'https://www.kbharkiv.dk/index.php?option=authorize&response_type=token&client_id=kbhkilder&api=oauth2',
            ERRORURL: 'https://www.kbharkiv.dk/deltag/indtast-data-fra-arkivmateriale',
            SEARCHURL: 'https://www.kbharkiv.dk/permalink',
            BYPASSAUTH: true,
            //Number of items to fetch when working with typeahead data fields
            TYPEAHEADMAXIUMUM: 75
        }
    },

    development: {
        constants: {
            JSONURL: 'https://kildetaster.dev9.1508test.dk/resources/mock/',
            EDITORURL: '/kildetaster-development',
            RESSOURCEURL: 'https://www.kbhkilder.dk/software/kildetaster-development/resources/',
            API: 'https://www.kbhkilder.dk/1508/experimental',
            SOLRAPI: 'https://aws.kbhkilder.dk/solr/apacs_core/select',
            SEARCHCONFIGURL: 'https://www.kbhkilder.dk/1508/experimental/searchconfig',
            ERRORREPORCONFIGURL: 'https://www.kbhkilder.dk/1508/experimental/errorreportconfig',
            MAINDOMAIN: 'https://www.kbharkiv.dk',
            TOKENURL: 'https://www.kbharkiv.dk/index.php?option=authorize&response_type=token&client_id=kbhkilder&api=oauth2',
            ERRORURL: 'https://www.kbharkiv.dk/deltag/indtast-data-fra-arkivmateriale',
            SEARCHURL: 'https://www.kbharkiv.dk/permalink',
            BYPASSAUTH: false,
            //Number of items to fetch when working with typeahead data fields
            TYPEAHEADMAXIUMUM: 75
        }
    },

    developmentPublicBeta: {
        constants: {
            JSONURL: 'https://kildetaster.dev9.1508test.dk/resources/mock/',
            EDITORURL: '/kildetaster-public-beta',
            RESSOURCEURL: 'https://www.kbhkilder.dk/software/kildetaster-public-beta/resources/',
            API: 'https://www.kbhkilder.dk/1508/public_beta',
            SOLRAPI: 'https://aws.kbhkilder.dk/solr/apacs_core/select',
            SEARCHCONFIGURL: 'https://www.kbhkilder.dk/1508/public_beta/searchconfig',
            ERRORREPORCONFIGURL: 'https://www.kbhkilder.dk/1508/public_beta/errorreportconfig',
            MAINDOMAIN: 'https://www.kbharkiv.dk',
            TOKENURL: 'https://www.kbharkiv.dk/index.php?option=authorize&response_type=token&client_id=kbhkilder&api=oauth2',
            ERRORURL: 'https://www.kbharkiv.dk/deltag/indtast-data-fra-arkivmateriale',
            SEARCHURL: 'https://www.kbharkiv.dk/permalink',
            BYPASSAUTH: false,
            //Number of items to fetch when working with typeahead data fields
            TYPEAHEADMAXIUMUM: 75
        }
    },

    production: {
        constants: {
            JSONURL: 'http://kildetaster.dev9.1508test.dk/resources/mock/',
            EDITORURL: '/kildetaster',
            RESSOURCEURL: 'https://www.kbhkilder.dk/software/kildetaster-new-site/resources/',
            API: 'https://www.kbhkilder.dk/api',
            SOLRAPI: 'https://aws.kbhkilder.dk/solr/apacs_core/select',
            SEARCHCONFIGURL: 'https://www.kbhkilder.dk/api/searchconfig',
            ERRORREPORCONFIGURL: 'https://www.kbhkilder.dk/api/errorreportconfig',
            MAINDOMAIN: 'https://www.kbharkiv.dk',
            TOKENURL: 'https://www.kbharkiv.dk/index.php?option=authorize&response_type=token&client_id=kbhkilder&api=oauth2',
            ERRORURL: 'https://www.kbharkiv.dk/deltag/indtast-data-fra-arkivmateriale',
            SEARCHURL: 'https://www.kbharkiv.dk/permalink',
            BYPASSAUTH: false,
            //Number of items to fetch when working with typeahead data fields
            TYPEAHEADMAXIUMUM: 75
        }
    }
};
