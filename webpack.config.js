const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlPlugin = require('html-webpack-plugin')


module.exports = {
    entry: {
        build : './src/index.js'
    },
    output: {
        // задаем имя повходному файлу, если входных будет несколько и выходных будет столько же 
        filename: '[name].js',
        // путь сохранение 
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist'

    },
    //девсервер 
    devServer: {
        overlay: true,// выводит
        contentBase: path.resolve( __dirname, 'dist'),/* указываем путь */
        port: 4200 /*запускается тут локальный сервер*/
    },

    module: {
        rules: [
            {//babel
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: '/node_modules/'
            },
            {
                test: /\.scss$/,
                use:[
                    "style-loader",
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: { sourceMap: true }
                    },
                    {
                        loader: "postcss-loader",
                        options: { sourceMap: true, config: {path: 'postcss.config.js'} }
                    },
                    {
                        loader: "sass-loader",
                        options: { sourceMap: true }
                    }
                ]
            },
            {
                test: /\.css$/,
                use:[
                    "style-loader",
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: { sourceMap: true }
                    },
                    {
                        loader: "postcss-loader",
                        options: { sourceMap: true, config: {path: 'postcss.config.js'} }
                    }
                ]
             },
        ]},
    plugins: [
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
        new HtmlPlugin({
            filename: 'index.html',
            template: "./src/index.html"
        })
    ]

    }