module.exports = {

    options: {
        dest: '<%= package.resources %>/js/app/shared/constants.js',
        name: 'constants'
    },

    prototype: {
        constants: {
            JSON_URL: '/resources/mock/',
            EDITOR_URL: 'http://localhost:1508',
            RESOURCE_URL: '/resources/',
            API_ENDPOINT: 'https://www.kbhkilder.dk/api',
            SOLR_API_ENDPOINT: 'https://aws.kbhkilder.dk/solr/apacs_core/select',
            SEARCH_CONFIG_URL: 'https://www.kbhkilder.dk/1508/experimental/searchconfig',
            ERROR_REPORT_CONFIG_URL: 'https://www.kbhkilder.dk/1508/experimental/errorreportconfig',
            MAIN_DOMAIN: 'https://www.kbharkiv.dk',
            TOKEN_URL: 'https://www.kbharkiv.dk/index.php?option=authorize&response_type=token&client_id=kbhkilder&api=oauth2',
            ERROR_URL: 'https://www.kbharkiv.dk/deltag/indtast-data-fra-arkivmateriale',
            SEARCH_PERMALINK_URL: 'https://www.kbharkiv.dk/permalink',
            BYPASS_AUTH: false,
            //Number of items to fetch when working with typeahead data fields
            TYPEAHEAD_MAXIUMUM: 75
        }
    },

    prototypeNoAuth: {
        constants: {
            JSON_URL: '/resources/mock/',
            EDITOR_URL: 'http://localhost:1508',
            RESOURCE_URL: '/resources/',
            API_ENDPOINT: 'https://www.kbhkilder.dk/1508/experimental',
            SOLR_API_ENDPOINT: 'https://aws.kbhkilder.dk/solr/apacs_core/select',
            SEARCH_CONFIG_URL: 'https://www.kbhkilder.dk/1508/experimental/searchconfig',
            ERROR_REPORT_CONFIG_URL: 'https://www.kbhkilder.dk/1508/experimental/errorreportconfig',
            MAIN_DOMAIN: 'https://www.kbharkiv.dk',
            TOKEN_URL: 'https://www.kbharkiv.dk/index.php?option=authorize&response_type=token&client_id=kbhkilder&api=oauth2',
            ERROR_URL: 'https://www.kbharkiv.dk/deltag/indtast-data-fra-arkivmateriale',
            SEARCH_PERMALINK_URL: 'https://www.kbharkiv.dk/permalink',
            BYPASS_AUTH: true,
            //Number of items to fetch when working with typeahead data fields
            TYPEAHEAD_MAXIUMUM: 75
        }
    },

    localNoAuth: {
        constants: {
            JSON_URL: '/resources/mock/',
            EDITOR_URL: 'http://localhost:1508',
            RESOURCE_URL: '/resources/',
            API_ENDPOINT: 'http://localhost:8080',
            SOLR_API_ENDPOINT: 'http://localhost:8989/solr/apacs_core/select',
            SEARCH_CONFIG_URL: 'http://localhost:8080/searchconfig',
            ERROR_REPORT_CONFIG_URL: 'http://localhost:8080/errorreportconfig',
            MAIN_DOMAIN: 'https://www.kbharkiv.dk',
            TOKEN_URL: 'https://www.kbharkiv.dk/index.php?option=authorize&response_type=token&client_id=kbhkilder&api=oauth2',
            ERROR_URL: 'https://www.kbharkiv.dk/deltag/indtast-data-fra-arkivmateriale',
            SEARCH_PERMALINK_URL: 'https://www.kbharkiv.dk/permalink',
            BYPASS_AUTH: true,
            //Number of items to fetch when working with typeahead data fields
            TYPEAHEAD_MAXIUMUM: 75
        }
    },

    development: {
        constants: {
            JSON_URL: 'https://kildetaster.dev9.1508test.dk/resources/mock/',
            EDITOR_URL: '/kildetaster-development',
            RESOURCE_URL: 'https://www.kbhkilder.dk/software/kildetaster-development/resources/',
            API_ENDPOINT: 'https://www.kbhkilder.dk/1508/experimental',
            SOLR_API_ENDPOINT: 'https://aws.kbhkilder.dk/solr/apacs_core/select',
            SEARCH_CONFIG_URL: 'https://www.kbhkilder.dk/1508/experimental/searchconfig',
            ERROR_REPORT_CONFIG_URL: 'https://www.kbhkilder.dk/1508/experimental/errorreportconfig',
            MAIN_DOMAIN: 'https://www.kbharkiv.dk',
            TOKEN_URL: 'https://www.kbharkiv.dk/index.php?option=authorize&response_type=token&client_id=kbhkilder&api=oauth2',
            ERROR_URL: 'https://www.kbharkiv.dk/deltag/indtast-data-fra-arkivmateriale',
            SEARCH_PERMALINK_URL: 'https://www.kbharkiv.dk/permalink',
            BYPASS_AUTH: false,
            //Number of items to fetch when working with typeahead data fields
            TYPEAHEAD_MAXIUMUM: 75
        }
    },

    developmentPublicBeta: {
        constants: {
            JSON_URL: 'https://kildetaster.dev9.1508test.dk/resources/mock/',
            EDITOR_URL: '/kildetaster-public-beta',
            RESOURCE_URL: 'https://www.kbhkilder.dk/software/kildetaster-public-beta/resources/',
            API_ENDPOINT: 'https://www.kbhkilder.dk/1508/public_beta',
            SOLR_API_ENDPOINT: 'https://aws.kbhkilder.dk/solr/apacs_core/select',
            SEARCH_CONFIG_URL: 'https://www.kbhkilder.dk/1508/public_beta/searchconfig',
            ERROR_REPORT_CONFIG_URL: 'https://www.kbhkilder.dk/1508/public_beta/errorreportconfig',
            MAIN_DOMAIN: 'https://www.kbharkiv.dk',
            TOKEN_URL: 'https://www.kbharkiv.dk/index.php?option=authorize&response_type=token&client_id=kbhkilder&api=oauth2',
            ERROR_URL: 'https://www.kbharkiv.dk/deltag/indtast-data-fra-arkivmateriale',
            SEARCH_PERMALINK_URL: 'https://www.kbharkiv.dk/permalink',
            BYPASS_AUTH: false,
            //Number of items to fetch when working with typeahead data fields
            TYPEAHEAD_MAXIUMUM: 75
        }
    },

    production: {
        constants: {
            JSON_URL: 'http://kildetaster.dev9.1508test.dk/resources/mock/',
            EDITOR_URL: '/kildetaster',
            RESOURCE_URL: 'https://www.kbhkilder.dk/software/kildetaster-new-site/resources/',
            API_ENDPOINT: 'https://www.kbhkilder.dk/api',
            SOLR_API_ENDPOINT: 'https://aws.kbhkilder.dk/solr/apacs_core/select',
            SEARCH_CONFIG_URL: 'https://www.kbhkilder.dk/api/searchconfig',
            ERROR_REPORT_CONFIG_URL: 'https://www.kbhkilder.dk/api/errorreportconfig',
            MAIN_DOMAIN: 'https://www.kbharkiv.dk',
            TOKEN_URL: 'https://www.kbharkiv.dk/index.php?option=authorize&response_type=token&client_id=kbhkilder&api=oauth2',
            ERROR_URL: 'https://www.kbharkiv.dk/deltag/indtast-data-fra-arkivmateriale',
            SEARCH_PERMALINK_URL: 'https://www.kbharkiv.dk/permalink',
            BYPASS_AUTH: false,
            //Number of items to fetch when working with typeahead data fields
            TYPEAHEAD_MAXIUMUM: 75
        }
    }
};
