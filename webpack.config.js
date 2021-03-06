const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = (env, argv) => {
    let DEV = argv.mode == 'development';
    let CONSTANTSET = argv.constants ? argv.constants : 'development';
    let PUBLIC = argv.public ? argv.public : '/';
    let DEVSERVER = /webpack-dev-server/.test(argv['$0']);

    console.log('Development:', DEV);
    console.log('Constantset:', CONSTANTSET);
    console.log('Public:', PUBLIC);

    var config = {
        // entrypoints
        entry: {
            editor: './src/js/main.js',
            sdk: './src/js/sdk-main.js',
            datasource: './datasource-editor/js/main.js'
        },

        // resulting bundles
        output: {
            filename: (pathData) => {
                return '[name].js'
            },
            path: path.resolve(__dirname, 'dist'),
            publicPath: PUBLIC
        },

        resolve: {
            extensions: ['.js', '.jsx', '.scss'],

            alias: {
                'angular-ui-router/stateEvents': path.resolve(__dirname, 'node_modules/angular-ui-router/release/stateEvents'),
                'angular-schema-form-bootstrap': path.resolve(__dirname, 'node_modules/angular-schema-form/dist/bootstrap-decorator'),
                'angular-locale-da': path.resolve(__dirname, 'node_modules/angular-i18n/angular-locale_da-dk'),
                'bootstrap-tooltip': path.resolve(__dirname, 'node_modules/bootstrap/js/src/tooltip'),
                'bootstrap-carousel': path.resolve(__dirname, 'node_modules/bootstrap/js/src/carousel'),
                'schemaForm': 'angular-schema-form',
                'openseadragon': require.resolve('openseadragon'), // override openseadragonselection dependency
            }
        },

        module: {
            rules: [
                // Shimming
                {
                    test: require.resolve('angular'),
                    use: ['exports-loader?angular']
                },
                
                // Exposes jQuery for use outside Webpack build
                {
                    test: require.resolve('jquery'),
                    use: [{
                        loader: 'expose-loader',
                        options: 'jQuery'
                    }, {
                        loader: 'expose-loader',
                        options: '$'
                    }]
                },

                // Constants
                {
                    test: path.resolve(__dirname, 'constants.json'),
                    use: {
                        loader: 'ng-package-constants-loader',
                        options: {
                            moduleName: 'constants',
                            configKey: CONSTANTSET + '.constants',
                            wrap: 'es6'
                        }
                    },
                    type: 'javascript/auto'
                },

                // Templates
                {
                    test: /\.tpl\.html$/,
                    use: ['html-loader']
                },

                // SCSS module handling
                {
                    test: /\.module\.s(a|c)ss$/,
                    loader: [
                        DEV ? 'style-loader' : MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                sourceMap: DEV,
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: DEV
                            }
                        }
                    ]
                },

                // SCSS handling
                {
                    test: /\.s(a|c)ss$/,
                    exclude: /\.module\.(s(a|c)ss)$/,
                    loader: [
                        DEV ? 'style-loader' : MiniCssExtractPlugin.loader,
                        'css-loader',
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: DEV
                            }
                        }
                    ]
                },

                // Fonts
                {
                    test: /\.(woff2?|ttf|eot|svg)$/,
                    exclude: /images/,
                    use: 
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts/'
                        }
                    }
                },

                // Feather icons
                {
                    test: /feather-sprite\.svg/,
                    use: [ 'svg-inline-loader' ]
                },

                // Images
                {
                    test: /\.(svg|png|gif)$/,
                    exclude: /feather-sprite/,
                    use: {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'images/'
                        }
                    }
                },

                // Directly imported css (bootstrap in datasource editor)
                {
                    test: /\.css$/,
                    use: [
                        DEV ? 'style-loader' : MiniCssExtractPlugin.loader,
                        'css-loader'
                    ]
                }
            ]
        },

        // inline source maps for development
        devtool: DEV ? 'inline-source-map' : 'source-map',

        // configure webpack-dev-server to serve static dump files
        devServer: {
            contentBase: [
                './dist/editor',
                './dist/search',
                './dist/sdk',
                './dist/callback',

                './devServer/wordpress_files',
                './src/fonts'
            ],
            contentBasePublicPath: [
                '/editor',
                '/search',
                '/sdk',
                '/callback',
                
                '/resources/wordpress_files',
                '/resources/fonts'
            ],
            historyApiFallback: {
                rewrites: [
                    { from: /^\/sdk/, to: '/sdk/index.html' },
                    { from: /^\/editor/, to: '/editor/index.html' },
                    { from: /^\/search/, to: '/search/index.html' },
                    { from: /^\/datalister/, to: '/datalister/index.html'}
                ]   
            },
            writeToDisk: true,
            port: 9000  
        },

        plugins: [
            new CleanWebpackPlugin(),

            // CSS is extracted for production builds
            new MiniCssExtractPlugin({
                moduleFilename: ({name}) => '[name].css',
            }),

            // Production index
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: './src/html/index.html',
                inject: false,
            }),

            new HtmlWebpackPlugin({
                filename: 'callback/index.html',
                template: './src/html/callback.html',
                inject: false
            }),

            new HtmlWebpackPlugin({
                filename: 'datalister/index.html',
                title: 'Datalister',
                template: './datasource-editor/index.html',
                inject: false
            }),

            new webpack.ProvidePlugin({auth0: 'auth0-js'})
        ]
    };

    // Only create test pages if running through dev server
    if (DEVSERVER) {
        // development webpage for editor app
        config.plugins.push(new HtmlWebpackPlugin({
            filename: 'editor/index.html',
            title: 'Editor',
            template: './devServer/editor.html',
            inject: false
        }));

        // development webpage for sdk components and directives
        config.plugins.push(new HtmlWebpackPlugin({
            filename: 'sdk/index.html',
            title: 'SDK',
            template: './devServer/sdk.html',
            inject: false
        }));

        // development webpage for search app
        config.plugins.push(new HtmlWebpackPlugin({
            filename: 'search/index.html',
            title: 'Search',
            template: './devServer/search.html',
            inject: false
        }));
    }

    return config;
};