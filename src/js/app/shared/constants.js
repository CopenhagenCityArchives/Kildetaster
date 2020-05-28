angular.module('constants', [])

.constant('JSON_URL', '/resources/mock/')

.constant('EDITOR_URL', 'http://localhost:1508')

.constant('RESOURCE_URL', '/resources/')

.constant('API_ENDPOINT', 'https://www.kbhkilder.dk/1508/experimental')

.constant('SOLR_API_ENDPOINT', 'https://aws.kbhkilder.dk/solr/apacs_core/select')

.constant('SEARCH_CONFIG_URL', 'https://www.kbhkilder.dk/1508/experimental/searchconfig')

.constant('ERROR_REPORT_CONFIG_URL', 'https://www.kbhkilder.dk/1508/experimental/errorreportconfig')

.constant('MAIN_DOMAIN', 'https://www.kbharkiv.dk')

.constant('TOKEN_URL', 'https://www.kbharkiv.dk/index.php?option=authorize&response_type=token&client_id=kbhkilder&api=oauth2')

.constant('ERROR_URL', 'https://www.kbharkiv.dk/deltag/indtast-data-fra-arkivmateriale')

.constant('SEARCH_PERMALINK_URL', 'https://www.kbharkiv.dk/permalink')

.constant('BYPASS_AUTH', true)

.constant('TYPEAHEAD_MAXIUMUM', 75)

;