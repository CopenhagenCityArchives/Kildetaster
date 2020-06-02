options = {
	
	options: {
		hostname: '0.0.0.0',
		livereload: true
	},

	prototype: {
		options: {
			port: 1508,
			bases: ['<%= package.prototype %>'],
			server: 'Interface/configs/express-server-prototype'
		}
	},
	sdk: {
		options: {
			port: 1510,
			bases: ['<%= package.sdk %>'],
			server: 'Interface/configs/express-server-sdk'
		}
	}
};

module.exports = options;