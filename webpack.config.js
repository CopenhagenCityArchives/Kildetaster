const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (env, argv) => {
    let DEV = argv.mode == 'development';
    let CONSTANTS = argv.constants ? argv.constants : 'development';

    return {
        entry: {
            editor: './Interface/resources/js/main.js',
            sdk: './Interface/resources/js/sdk-main.js'
        },
        resolve: {
            extensions: ['.js', '.jsx', '.scss'],
            alias: {
                'almond': path.resolve(__dirname, 'Interface/resources/bower_components/almond/almond'),
                
                'angular': path.resolve(__dirname, 'Interface/resources/bower_components/angular/angular.min'),
                'angular-bootstrap': path.resolve(__dirname, 'Interface/resources/bower_components/angular-bootstrap/ui-bootstrap-tpls.min'),
                'angular-animate': path.resolve(__dirname, 'Interface/resources/bower_components/angular-animate/angular-animate.min'),
                'angular-sanitize': path.resolve(__dirname, 'Interface/resources/bower_components/angular-sanitize/angular-sanitize.min'),
                'angular-cookies': path.resolve(__dirname, 'Interface/resources/bower_components/angular-cookies/angular-cookies.min'),
                'ngstorage': path.resolve(__dirname, 'Interface/resources/bower_components/ngstorage/ngStorage.min'),

                'angular-google-analytics': path.resolve(__dirname, 'Interface/resources/bower_components/angular-google-analytics/dist/angular-google-analytics.min'),

                'angular-ui-router$': path.resolve(__dirname, 'Interface/resources/bower_components/angular-ui-router/release/angular-ui-router.min'),
                // Polyfill for ui-router events being deprecated @see https://ui-router.github.io/guide/ng1/migrate-to-1_0
                'angular-ui-router/stateEvents': path.resolve(__dirname, 'Interface/resources/bower_components/angular-ui-router/release/stateEvents'),

                'angular-ui-select': path.resolve(__dirname, 'Interface/resources/bower_components/angular-ui-select/dist/select'),
                'angularjs-datepicker': path.resolve(__dirname, 'Interface/resources/bower_components/angularjs-datepicker/dist/angular-datepicker'),
                'angular-filter': path.resolve(__dirname, 'Interface/resources/bower_components/angular-filter/dist/angular-filter.min'),

                //Angular json form
                'tv4': path.resolve(__dirname, 'Interface/resources/bower_components/tv4/tv4'),
                'objectpath': path.resolve(__dirname, 'Interface/resources/bower_components/objectpath/lib/ObjectPath'),
                'schemaForm': path.resolve(__dirname, 'Interface/resources/bower_components/angular-schema-form/dist/schema-form.min'),
                'angular-schema-form-bootstrap': path.resolve(__dirname, 'Interface/resources/bower_components/angular-schema-form/dist/bootstrap-decorator'),
                'moment': path.resolve(__dirname, 'Interface/resources/bower_components/moment/min/moment-with-locales'),
                //Copy /paste library
                'clipboard': path.resolve(__dirname, 'Interface/resources/bower_components/clipboard/dist/clipboard.min'),

                'angular-flash': path.resolve(__dirname, 'Interface/resources/bower_components/angular-flash-alert/dist/angular-flash'),

                'openseadragon': path.resolve(__dirname, 'Interface/resources/bower_components/openseadragon/built-openseadragon/openseadragon/openseadragon.min'),
                'libs/openseadragonselection': path.resolve(__dirname, 'Interface/resources/js/libs', 'openseadragonselection'),
                'libs/openseadragon-filtering': path.resolve(__dirname, 'Interface/resources/js/libs', 'openseadragon-filtering'),
                'libs/openseadragon-imaginghelper': path.resolve(__dirname, 'Interface/resources/js/libs', 'openseadragon-imaginghelper'),
                'libs/openseadragon-viewerinputhook': path.resolve(__dirname, 'Interface/resources/js/libs', 'openseadragon-viewerinputhook'),
                'query-string': path.resolve(__dirname, 'Interface/resources/bower_components/query-string/query-string'),
        
                //Libs
                'jquery.cookie': path.resolve(__dirname, 'Interface/resources/js/libs/jquery.cookie'),
            }
        },
        output: {
            filename: '[name].[hash].js',
            path: path.resolve(__dirname, 'dist'),
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
                            configKey: CONSTANTS + '.constants',
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
                    use: 
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts/'
                        }
                    }

                }
            ]
        },
        devtool: 'inline-source-map',
        devServer: {
            contentBase: './dist'
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: DEV ? '[name].css' : '[name].[hash].css',
                chunkFilename: DEV ? '[id].css' : '[id].[hash].css'
            }),
            new HtmlWebpackPlugin({
                filename: 'editor.html',
                title: 'Editor',
                template: 'templates/editor.html',
                inject: false
            }),
            new HtmlWebpackPlugin({
                filename: 'sdk.html',
                title: 'SDK',
                template: 'templates/sdk.html',
                inject: false
            }),
            new HtmlWebpackPlugin({
                filename: 'search.html',
                title: 'Search',
                template: 'templates/search.html',
                inject: false
            })
        ]
    };
};