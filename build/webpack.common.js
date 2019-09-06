const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const glob = require('glob');
const pages = glob
    .sync(`./src/**/index.tsx`)
    .reduce((pages, path) => {
        const chunk = path
            .split('./src/')[1]
            .split(`/index.tsx`)[0];
        pages[chunk] = {
            entry: `src/pages/${chunk}/index.tsx`,
            template: path.replace(/.tsx/g, '.html'),
            filename: `${chunk}.html`,
        };
        return pages;
    }, {});

// console.log('pages', pages);

module.exports = {
    entry: {
        popup: './src/popup/index.tsx',
        background: './src/background/index.tsx',
        content_script: './src/content_script/index.tsx',
    },
    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, '../dist')
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css?$/,
                use: [
                    'style-loader',
                    'css-loader',
                ],
            },
            {
                test: /\.scss?$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ],
            },
            {
                test: /\.(png|svg|jpg|gif)?$/,
                use: ['url-loader'],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)?$/,
                use: ['url-loader'],
            },
        ],
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, '../src')
        },
        extensions: ['.tsx', '.ts', '.js']
    },
    plugins: [
        new HtmlWebpackPlugin({
            chunks: ['popup'],
            title: 'popup',
            filename: "popup.html",
            template: 'src/popup/index.html'
        })
    ],
};
