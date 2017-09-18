var webpack = require('webpack');
const path = require('path');

module.exports = {

    entry: [
        './src/index.js',
        './src/style.css',
        'webpack-dev-server/client?http://0.0.0.0:3001',
        'webpack/hot/only-dev-server'
    ],

    output: {
        path: '/',
        filename: 'bundle.js'
    },
    //React 프로젝트의 루트디렉토리를 설정
    resolve: {
//        root: path.resolve('./src')
        modules: [
            path.resolve('./src'),
            "node_modules"
        ]
    },

    devServer: {
        hot: true,
        filename: 'bundle.js',
        publicPath: '/',
        historyApiFallback: true,
        contentBase: './public',
        proxy: {
            "**": "http://localhost:3000"
        }
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ],

    module: {
        rules: [
            {
                test: /.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    cacheDirectory: true,
                    presets: ['es2015', 'react'],
                    plugins: ["react-hot-loader/babel"]
                }
            },
            {
                test: /\.css$/,
//                loader: 'style!css-loader'
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    }
};
