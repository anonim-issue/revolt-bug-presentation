const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlMinimizerPlugin = require("html-minimizer-webpack-plugin");
const {merge} = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = (env, argv) => {
    return merge(common(env, argv), {
        mode: 'production',
        output: {
            filename: 'js/[name].[contenthash:8].js',
        },
        optimization: {
            minimizer: [
                // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
                `...`,
                new CssMinimizerPlugin(),
                new HtmlMinimizerPlugin(),
            ],
        }
    })
}