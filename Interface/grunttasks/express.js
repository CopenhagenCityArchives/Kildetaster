module.exports = {
	
	options: {
		hostname: '0.0.0.0',
		livereload: true,
	},

	prototype: {
		options: {
			port: 1508,
			bases: ['<%= package.prototype %>']
		}
	},
	sdk: {
		options: {
			port: 1510,
			bases: ['<%= package.sdk %>']
		}
	}
};