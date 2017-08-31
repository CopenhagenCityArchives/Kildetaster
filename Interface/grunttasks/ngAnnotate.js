module.exports = {

    development: {

        add: true,
        files: {
            'kbh/resources/js/script.js': ['kbh/resources/js/script.js'],
            'kbh/resources/js/sdk.js': ['kbh/resources/js/sdk.js']
        }
    },

    production: {

        add: true,
        files: {
            'kbh/resources/js/script.js': ['kbh/resources/js/script.js'],
            'kbh/resources/js/sdk.js': ['kbh/resources/js/sdk.js']
        }
    },

    sdk: {

        add: true,
        files: {
            '_sdk/resources/js/sdk.js': ['_sdk/resources/js/sdk.js']
        }
    }
};
