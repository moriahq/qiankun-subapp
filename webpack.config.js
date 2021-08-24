const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const LessPluginFunctions = require('less-plugin-functions');
const StatsPlugin = require('stats-webpack-plugin');
const svgToMiniDataURI = require('mini-svg-data-uri');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const hasha = require('hasha');
const namespacePefixer = require('postcss-selector-namespace');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const smp = new SpeedMeasurePlugin();

const distOutputPath = 'dist';

// output配置
const outputConfig = isProd =>
(isProd
    ? {
        filename: 'js/[name].[chunkhash].min.js',
        path: path.resolve(__dirname, distOutputPath),
        publicPath: './',
        library: 'proxima-plugin',
        libraryTarget: 'umd',
    }
    : {
        filename: 'main.js',
        path: path.resolve(__dirname, distOutputPath),
        publicPath: '/',
    });

const getLocalIdent = ({ resourcePath }, localIdentName, localName) => {
    if (/\.global\.(css|less)$/.test(resourcePath) || /node_modules/.test(resourcePath)) {
        // 不做cssModule 处理的
        return localName;
    }
    return `${localName}__${hasha(resourcePath + localName, { algorithm: 'md5' }).slice(0, 8)}`;
};

module.exports = (cliEnv = {}, argv) => {
    console.log(cliEnv, argv);
    const mode = argv.mode;

    if (!['production', 'development'].includes(mode)) {
        throw new Error('The mode is required for NODE_ENV, BABEL_ENV but was not specified.');
    }

    const isProd = mode === 'production';
    const isDev = mode === 'development';
    console.log({ isProd, isDev });

    const classNamesConfig = {
        loader: '@ecomfe/class-names-loader',
        options: {
            classNamesModule: require.resolve('classnames'),
        },
    };
    // 生产环境使用 MiniCssExtractPlugin
    // const extractOrStyleLoaderConfig = 'style-loader';
    const extractOrStyleLoaderConfig = isProd ? MiniCssExtractPlugin.loader : 'style-loader';

    // 根据 patterns 使用 style-resources-loader
    const makeStyleResourcesLoader = patterns => ({
        loader: 'style-resources-loader',
        options: {
            patterns,
            injector: 'append',
        },
    });

    const lessLoaderConfig = {
        loader: 'less-loader',
        options: {
            lessOptions: {
                javascriptEnabled: true,
                modifyVars: {
                    'ant-prefix': 'ant',
                },
                plugins: [new LessPluginFunctions({ alwaysOverride: true })],
            },
        },
    };

    const cssLoaderConfig = {
        loader: 'css-loader',
        options: {
            modules: { getLocalIdent },
            importLoaders: 1,
        },
    };

    const postcssLoaderConfig = {
        loader: 'postcss-loader',
        options: {
            postcssOptions: {
                plugins: [
                    namespacePefixer({
                        namespace: '.proxima-plugin',
                    }),
                ],
            },
        },
    };
    const webpackConfig = {
        entry: './src/index.js',
        mode: isProd ? 'production' : 'development',
        output: outputConfig(isProd),
        devtool: (() => {
            if (isProd) {
                return 'source-map';
            }
            if (isDev) {
                return 'inline-cheap-module-source-map';
            }
            return false;
        })(),
        resolve: {
            extensions: ['.js', '.css', '.jsx'],
        },
        devServer: {
            hot: "only",
            static: {
                directory: path.resolve(__dirname, '../dist'),
                staticOptions: {},
                // Don't be confused with `devMiddleware.publicPath`, it is `publicPath` for static directory
                // Can be:
                // publicPath: ['/static-public-path-one/', '/static-public-path-two/'],
                publicPath: "/static-public-path/",
                // Can be:
                // serveIndex: {} (options for the `serveIndex` option you can find https://github.com/expressjs/serve-index)
                serveIndex: true,
                // Can be:
                // watch: {} (options for the `watch` option you can find https://github.com/paulmillr/chokidar)
                watch: true,
            },
            historyApiFallback: {
                disableDotRule: true,
                index: '/',
            },
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Headers": "*",
              "Access-Control-Allow-Methods": "*",
            },
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, 'public/index.html'),
                filename: 'index.html',
                inject: true,
            }),
            isProd
            && new MiniCssExtractPlugin({
                filename: '[name].[contenthash].css',
                chunkFilename: '[name].[contenthash].chunk.css',
                // experimentalUseImportModule: true,
            }),
            new StatsPlugin('stats-manifest.json', {
                chunkModules: false,
                entrypoints: true,
                source: false,
                chunks: false,
                modules: false,
                assets: false,
                children: false,
                outputPath: false,
                chunkGroups: false,
                exclude: [/node_modules/],
            }),
            new CleanWebpackPlugin(),
        ].filter(Boolean),
        // optimization: {
        //   splitChunks: {
        //     chunks: 'async',
        //     minSize: 20000,
        //     minRemainingSize: 0,
        //     minChunks: 1,
        //     maxAsyncRequests: 30,
        //     maxInitialRequests: 30,
        //     enforceSizeThreshold: 50000,
        //     cacheGroups: {
        //       defaultVendors: {
        //         test: /[\\/]node_modules[\\/]/,
        //         priority: -10,
        //         reuseExistingChunk: true
        //       },
        //       default: {
        //         minChunks: 2,
        //         priority: -20,
        //         reuseExistingChunk: true
        //       }
        //     }
        //   }
        // },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env', '@babel/preset-react'],
                            plugins: [['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }]],
                        },
                    },
                },
                {
                    test: /\.css/,
                    include: [path.resolve(__dirname, 'src')],
                    use: [classNamesConfig, extractOrStyleLoaderConfig, cssLoaderConfig],
                },
                {
                    test: /\.css/,
                    include: [
                        path.resolve(__dirname, 'node_modules/antd/'),
                        path.resolve(__dirname, 'node_modules/@osui'),
                        path.resolve(__dirname, 'node_modules/github-markdown-css'),
                    ],
                    use: [classNamesConfig, extractOrStyleLoaderConfig, 'css-loader', postcssLoaderConfig],
                },
                {
                    test: /\.less$/,
                    // eslint-disable-next-line max-len
                    include: [path.resolve(__dirname, 'node_modules/antd/'), path.resolve(__dirname, 'node_modules/@osui')],
                    use: [
                        extractOrStyleLoaderConfig,
                        cssLoaderConfig,
                        postcssLoaderConfig,
                        lessLoaderConfig,
                        makeStyleResourcesLoader([
                            path.resolve(__dirname, 'node_modules/@osui/theme/dist/antd-vars-patch.less'),
                            path.resolve(__dirname, 'node_modules/@osui/theme/dist/less-functions-overrides.less'),
                        ]),
                    ],
                },
                {
                    test: /\.less$/,
                    include: [path.resolve(__dirname, 'src')],
                    use: [
                        classNamesConfig,
                        extractOrStyleLoaderConfig,
                        cssLoaderConfig,
                        'postcss-loader',
                        lessLoaderConfig,
                        makeStyleResourcesLoader([
                            path.resolve(__dirname, 'node_modules/@osui/theme/dist/antd-vars-patch.less'),
                            path.resolve(__dirname, 'node_modules/@osui/theme/dist/less-functions-overrides.less'),
                        ]),
                    ],
                },
                // 静态资源
                {
                    test: /\.(png|jpg|gif)$/i,
                    type: 'asset/resource',
                    generator: {
                        filename: 'resource/[hash][ext][query]',
                    },
                },
                {
                    test: /\.svg/,
                    type: 'asset',
                    generator: {
                        dataUrl: content => {
                            content = content.toString();
                            return svgToMiniDataURI(content);
                        },
                    },
                    // 小于 400 kb inline， 大于400kb resource
                    parser: {
                        dataUrlCondition: {
                            maxSize: 400 * 1024, // 200kb
                        },
                    },
                },
            ],
        },
    };
    return isProd ? webpackConfig : smp.wrap(webpackConfig);
};
