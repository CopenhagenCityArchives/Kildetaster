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