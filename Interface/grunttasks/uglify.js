module.exports = {

    development: {
        files: {
            'kbh/resources/js/script.js': ['kbh/resources/js/script.js']
        }
    },

    production: {
        files: {
            'kbh/resources/js/script.js': ['kbh/resources/js/script.js'],
            //Removed in order to better debug when sdk is used on KBH site
            'kbh/resources/js/sdk.js': ['kbh/resources/js/sdk.js']
        }
    },

    sdk: {
        files: {
            '_sdk/resources/js/sdk.js': ['_sdk/resources/js/sdk.js']
        }
    }
    
};