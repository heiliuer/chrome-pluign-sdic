const path = require('path');
const ZipPlugin = require('zip-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin')
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const packageJson = require('../package')

module.exports = merge(common, {
    mode: 'production',
    devtool: 'source-map',
    plugins: [
        new CleanWebpackPlugin({
            cleanStaleWebpackAssets: false,
        }),
        new CopyPlugin([
            {from: path.resolve(__dirname, '../public')}
        ]),
        new UglifyJSPlugin({
            sourceMap: true
        }),
        new ZipPlugin({
            filename: packageJson.name + '.zip',
            path: path.resolve(__dirname, '..'),
        })
    ],
});
