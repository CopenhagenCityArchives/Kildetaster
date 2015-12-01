module.exports = {

    options: {
        configFile: 'karma.conf.js'
    },

    prototype: {
        options: {
            browsers: ['PhantomJS'],
            background: true,
            singleRun: false
        }
    }

}
