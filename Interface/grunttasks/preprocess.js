module.exports = {
	prototype: {
		files: [{
			expand: true,
			cwd: '<%= package.html %>',
			src: ['*.html'],
			dest: '<%= package.prototype %>',
			ext: '.html',
		}]
	},

	api: {
		src: '<%= package.html %>index_stadsdump.html',
		dest: '<%= package.prototype %>'

	},

	production: {
		files: [{
			expand: true,
			cwd: '<%= package.html %>',
			src: ['*.html'],
			dest: '<%= package.build %>',
			ext: '.html',
		}]
	}
}