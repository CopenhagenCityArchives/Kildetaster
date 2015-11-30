module.exports = {
    production: {
        src: ['<%= package.buildresources %>/**'],
    },
    prototype: {
        src: ['<%= package.prototype %>/**'],
    },
    development: {
        src: ['<%= package.buildresources %>/**'],
    },
    staticsite: {
        src: ['<%= package.staticsite %>/**'],
    }
};