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
            API: 'https://www.kbhkilder.dk/1508/stable',
            SOLRAPI: 'http://ec2-54-194-89-54.eu-west-1.compute.amazonaws.com/solr/apacs_core/select',
            //API: 'http://www.kbhkilder.dk/1508/experimental',
            MAINDOMAIN: 'https://www.kbharkiv.dk',
            TOKENURL: 'https://www.kbharkiv.dk/index.php?option=authorize&response_type=token&client_id=kbhkilder&api=oauth2',
            ERRORURL: 'https://www.kbharkiv.dk/deltag/indtast-data-fra-arkivmateriale',
            SEARCHURL: 'https://www.kbharkiv.dk/sog-i-arkivet/sog-efter-personer',
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
            API: 'https://www.kbhkilder.dk/1508/experimental',
            SOLRAPI: 'http://ec2-54-194-89-54.eu-west-1.compute.amazonaws.com/solr/apacs_core/select',
            MAINDOMAIN: 'https://www.kbharkiv.dk',
            TOKENURL: 'https://www.kbharkiv.dk/index.php?option=authorize&response_type=token&client_id=kbhkilder&api=oauth2',
            ERRORURL: 'https://www.kbharkiv.dk/deltag/indtast-data-fra-arkivmateriale',
            SEARCHURL: 'https://www.kbharkiv.dk/sog-i-arkivet/sog-efter-personer',
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
            SDKCSSURL: 'https://www.kbhkilder.dk/software/kildetaster-development/resources/css/sdk.css',
            API: 'https://www.kbhkilder.dk/1508/experimental',
            SOLRAPI: 'http://ec2-54-194-89-54.eu-west-1.compute.amazonaws.com/solr/apacs_core/select',
            MAINDOMAIN: 'https://www.kbharkiv.dk',
            TOKENURL: 'https://www.kbharkiv.dk/index.php?option=authorize&response_type=token&client_id=kbhkilder&api=oauth2',
            ERRORURL: 'https://www.kbharkiv.dk/deltag/indtast-data-fra-arkivmateriale',
            SEARCHURL: 'https://www.kbharkiv.dk/sog-i-arkivet/sog-efter-personer',
            BYPASSAUTH: false,
            //Number of items to fetch when working with typeahead data fields
            TYPEAHEADMAXIUMUM: 75
        }
    },

    production: {
        constants: {
            JSONURL: 'http://kildetaster.dev9.1508test.dk/resources/mock/',
            EDITORURL: '/kildetaster',
            RESSOURCEURL: 'https://www.kbhkilder.dk/software/kildetaster/resources/',
            SDKCSSURL: 'https://www.kbhkilder.dk/software/kildetaster/resources/css/sdk.css',
            API: 'https://www.kbhkilder.dk/1508/stable',
            SOLRAPI: 'http://ec2-54-194-89-54.eu-west-1.compute.amazonaws.com/solr/apacs_core/select',
            MAINDOMAIN: 'https://www.kbharkiv.dk',
            TOKENURL: 'https://www.kbharkiv.dk/index.php?option=authorize&response_type=token&client_id=kbhkilder&api=oauth2',
            ERRORURL: 'https://www.kbharkiv.dk/deltag/indtast-data-fra-arkivmateriale',
            SEARCHURL: 'https://www.kbharkiv.dk/sog-i-arkivet/sog-efter-personer',
            BYPASSAUTH: false,
            //Number of items to fetch when working with typeahead data fields
            TYPEAHEADMAXIUMUM: 75
        }
    }
};
