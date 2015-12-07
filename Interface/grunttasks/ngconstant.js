module.exports = {
    
    options: {
        
        dest: '<%= package.resources %>/js/app/shared/constants.js',
        name: 'constants'
    },

    prototype: {
        constants: {
            EDITORURL: 'http://localhost:1508'
        }
    },

    development: {
        constants: {
            EDITORURL: 'DEVTODO'
        }
    },

    production: {
        constants: {
            EDITORURL: 'PRODTODO'
        }
    }
};