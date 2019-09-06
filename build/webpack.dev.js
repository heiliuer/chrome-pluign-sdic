const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    devtool: "cheap-module-eval-source-map",
    mode: 'development',
    devServer: {
        contentBase: 'public',
        hot: true
    },
    optimization: {
        namedModules: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            chunks: ['content_script'],
            title: 'content_script',
            filename: "content_script.html",
            template: 'src/content_script/index.html'
        }),
    ],
});
