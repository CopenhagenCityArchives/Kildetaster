const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (env, argv) => {
    let DEV = argv.mode == 'development';
    let CONSTANTSET = argv.constants ? argv.constants : 'development';

    return {

        // entrypoints
        entry: {
            editor: './src/js/main.js',
            sdk: './src/js/sdk-main.js'
        },

        // resulting bundles
        output: {
            filename: '[name].[hash].js',
            path: path.resolve(__dirname, 'dist'),
        },

        resolve: {
            extensions: ['.js', '.jsx', '.scss'],

            alias: {
                'angular-ui-router/stateEvents': path.resolve(__dirname, 'node_modules/angular-ui-router/release/stateEvents'),
                'angular-schema-form-bootstrap': path.resolve(__dirname, 'node_modules/angular-schema-form/dist/bootstrap-decorator'),
                'schemaForm': 'angular-schema-form',
                'libs/openseadragonselection': path.resolve(__dirname, 'src/js/libs', 'openseadragonselection'),
                'libs/openseadragon-filtering': path.resolve(__dirname, 'src/js/libs', 'openseadragon-filtering'),
                'libs/openseadragon-imaginghelper': path.resolve(__dirname, 'src/js/libs', 'openseadragon-imaginghelper'),
                'libs/openseadragon-viewerinputhook': path.resolve(__dirname, 'src/js/libs', 'openseadragon-viewerinputhook'),
            }
        },

        module: {
            rules: [
                // Shimming
                {
                    test: /openseadragon[^-s]/,
                    use: 'exports-loader?OpenSeadragon=window.OpenSeadragon'
                },
                {
                    test: /openseadragon(-|s)\w+/,
                    use: ['imports-loader?OpenSeadragon=openseadragon']
                },
                {
                    test: /angular\.min\.js$/,
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
                                sourceMap: DEV
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

                // Images
                {
                    test: /\.(svg|png|gif)$/,
                    use: {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'images/'
                        }
                    }
                }
            ]
        },

        // inline source maps for development
        devtool: DEV ? 'inline-source-map' : 'source-map',

        // configure webpack-dev-server to serve static dump files
        devServer: {
            contentBase: [
                './dist',
                './devServer/search_files',
                './devServer/dump/index_files',
                './src/fonts'
            ],
            contentBasePublicPath: [
                '/',
                '/resources/search_files',
                '/resources/index_files',
                '/resources/fonts'
            ],
            writeToDisk: true
        },

        plugins: [
            new CleanWebpackPlugin(),

            // CSS is extracted for production builds
            new MiniCssExtractPlugin({
                filename: DEV ? '[name].css' : '[name].[hash].css',
                chunkFilename: DEV ? '[id].css' : '[id].[hash].css'
            }),

            // development webpage for editor app
            new HtmlWebpackPlugin({
                filename: 'editor.html',
                title: 'Editor',
                template: 'devServer/editor.html',
                inject: false
            }),

            // development webpage for sdk components and directives
            new HtmlWebpackPlugin({
                filename: 'sdk.html',
                title: 'SDK',
                template: 'devServer/sdk.html',
                inject: false
            }),

            // development webpage for search app
            new HtmlWebpackPlugin({
                filename: 'search.html',
                title: 'Search',
                template: 'devServer/search.html',
                inject: false
            })
        ]
    };
};