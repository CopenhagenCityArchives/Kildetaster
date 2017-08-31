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
    },

    production: {
        options: {
            browsers: ['PhantomJS'],
            singleRun: true,
            reporters: ['teamcity']
        }
    }

};