const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
/* @type {import('webpack').Configuration} */
module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js",
    },
    mode: "production",
    module: {
        rules: [
            {
                use: "babel-loader",
                test: /.(js|jsx)$/,
                exclude: /node_modules/,
            },
            {
                use: ["style-loader", "css-loader", "sass-loader"],
                test: /.(css|sass|scss)$/,
            },
            {
                type: "asset",
                test: /.(png|svg|jpg|jpeg|gif)$/i,
            },
            {
                test: /.(html)$/,
                use: {
                    loader: "html-loader",
                },
            },
        ],
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        open: true,
        openPage: "react-crud",
        port: 9000,
        historyApiFallback: true
    },
    resolve: {
        extensions: [".js", ".jsx"],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: "./public/index.html",
        }),
    ],
};