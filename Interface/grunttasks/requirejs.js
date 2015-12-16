module.exports = {

    development: {
        options: {
            name: 'almond',
            wrap: true,
            preserveLicenseComments: false,
            baseUrl: "<%= package.resources %>/js",
            mainConfigFile: "<%= package.resources %>/js/config.js",
            out: "<%= package.buildresources %>/js/script.js",
            optimize: "none"
        }
    },

    production: {
        options: {
            name: 'almond',
            wrap: true,
            preserveLicenseComments: false,
            baseUrl: "<%= package.resources %>/js",
            mainConfigFile: "<%= package.resources %>/js/config.js",
            out: "<%= package.buildresources %>/js/script.js",
            optimize: "none"
        }
    },

    sdk: {
        options: {
            name: 'almond',
            wrap: true,
            preserveLicenseComments: false,
            
            //If set to true, any files that were combined into a build bundle will be
            //removed from the output folder.
            removeCombined: true,
            
            //jQuery is already included where we use the sdk, so do not bundle it when 
            //combining files - @see http://requirejs.org/docs/optimization.html#empty
            paths: {
                jquery: "empty:"
            },
            baseUrl: "<%= package.resources %>/js",
            mainConfigFile: "<%= package.resources %>/js/sdk-config.js",
            out: "<%= package.buildresources %>/js/sdk.js",
            optimize: "none"
        }
    },

};
