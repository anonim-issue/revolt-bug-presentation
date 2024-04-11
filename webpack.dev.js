const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = (env, argv) => {
    return merge(common(env, argv), {
        mode: 'development',
        devtool: 'source-map',
        devServer: {
            static: ['static'],
            historyApiFallback: true,
            host: '0.0.0.0',
            port: 3020,
            hot: true,
        },
    });
};