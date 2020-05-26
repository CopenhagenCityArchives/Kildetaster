const path = require('path');

module.exports = {
    entry: './Interface/resources/js/main.js',
    output: {
        filename: 'editor.js',
        path: path.resolve(__dirname, 'dist'),
    },
};