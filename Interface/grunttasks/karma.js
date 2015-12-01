module.exports = {

    options: {
        configFile: 'karma.conf.js'
    },

    prototype: {
        options: {
            browsers: ['Chrome'],
            background: true,
            singleRun: false
        }
    }

}
