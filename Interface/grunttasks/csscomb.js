module.exports = {
    options: {
        config: '<%= package.configs %>/csscomb/csscomb-config.json'
    },
    test: {
        files: [{
            expand: true,
            filter: 'isFile',
            cwd: '<%= package.resources %>/sass',
            src: '**/*.scss',
            dest: '<%= package.resources %>/sass'
        }]
    }
};