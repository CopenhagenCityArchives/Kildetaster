module.exports = {
    production: {
        src: ['<%= package.buildresources %>/**'],
    },
    prototype: {
        src: ['<%= package.prototype %>/**'],
    },
    sdk: {
      src: ['<%= package.sdk %>/**'],  
    },
    development: {
        src: ['<%= package.buildresources %>/**'],
    }
};