module.exports = {
    /*
     * Add query parameter to styles.css and script.js files
     */

    options: {
        match: ['styles.css', 'script.js'],
    },

    development: {
        files: {
            src: ['kbh/index.html']
        }
    },

    production: {
        files: {
            src: ['kbh/index.html']
        }
    }

}
