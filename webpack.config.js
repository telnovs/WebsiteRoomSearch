const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'build.js',
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        overlay:true,
        contentBase: path.resolve( __dirname, 'dist'),
        port: 4200
    },
    plugins: [
        new HTMLPlugin({
            filename: 'index.html',
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'style.css'
        })
    ],
    module: {
        rules: [
            {//babel
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: 'node_modules'
            },
            {     //css
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {  //sass
                test: /\.sass$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options:{sourceMap: true}
                    },
                    {
                        loader: 'sass-loader',
                        options:{sourceMap: true}
                    }
                ]
            }
    ]}
}