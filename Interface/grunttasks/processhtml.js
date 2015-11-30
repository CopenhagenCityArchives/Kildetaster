module.exports = {
    production: {
        files: [{
			expand: true,
			filter: 'isFile',
			cwd: '<%= package.build %>/',
			src: '*.html',
			dest: '<%= package.build %>'
		}]
    }
}