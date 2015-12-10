module.exports = {
    
    prototype: {
        src: ['<%= package.prototype %>/**'],
    },
    sdk: {
      src: ['<%= package.sdk %>/**'],  
    },
    development: {
        src: ['<%= package.buildresources %>/**'],
    },
    production: {
        src: ['<%= package.buildresources %>/**'],
    }
};