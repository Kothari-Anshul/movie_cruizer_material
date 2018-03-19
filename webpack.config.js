const path = require('path');
let HTML_WEBPACKPLUGIN = require('html-webpack-plugin');

module.exports = {
    entry: './js/controller.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [{
                test: '/\.js$/',
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015']
                    }
                }]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(jpeg|png|jpg)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        outputPath: 'img/',
                        publicPath: 'img/'
                    }
                }]
            },
            {
                test: /\.(woff|woff2)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        outputPath: 'fonts/',
                        publicPath: 'fonts/'
                    }
                }]
            }
        ]
    },
    devServer: {
        contentBase: './dist'
    },
    plugins: [
        new HTML_WEBPACKPLUGIN({
            template: './index.html'
        })
    ]
};