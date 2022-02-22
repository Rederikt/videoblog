const HtmlWebPackPlugin = require( 'html-webpack-plugin' );
const path = require( 'path' );
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const TerserPlugin = require('terser-webpack-plugin');
var webpack = require('webpack')


module.exports = {
    context: __dirname,
    entry: './src/index.js',
    output: {
        path: path.resolve( __dirname, 'dist' ),
        filename: 'main.js',
        publicPath: '/',
    },
    devServer: {
        disableHostCheck: true,
        historyApiFallback: true
     },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ["source-map-loader"],
                enforce: "pre"
              },
            {
                test: /\.js?$/,
                exclude: /node_module/,
                use: 'babel-loader'
            },
            {
                test: /\.css?$/,
                use: [ 'style-loader', 'css-loader' ]
            },
            {
                test: /\.(png|jpg|svg|gif|ico)?$/,
                use: 'file-loader'
            }
        ]
    },
    plugins: [
        new webpack.EvalSourceMapDevToolPlugin(),
        new TerserPlugin({
            parallel: true,
            terserOptions: {
              ecma: 6,
            },
          }),
        // new BundleAnalyzerPlugin(),
        new HtmlWebPackPlugin({
            template: './public/index.html',
            filename: './index.html',
            favicon: './public/favicon.ico'
        })
    ]
};