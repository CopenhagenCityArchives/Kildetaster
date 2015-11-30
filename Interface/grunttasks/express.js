module.exports = {
	prototype: {
		options: {
			port: 1508,
			hostname: "0.0.0.0",
			bases: ['<%= package.prototype %>'],
			livereload: true
		}
	},
	staticsite: {
		options: {
			port: 1508,
			hostname: "0.0.0.0",
			bases: ['<%= package.build %>']
		}
	}	
};