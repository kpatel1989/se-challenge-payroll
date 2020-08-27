const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: './handler.js',
    target: 'node',
    externals: [nodeExternals()],
    output: {
        libraryTarget: 'commonjs',
        path: path.join(__dirname, '.webpack'),
        filename: 'handler.js'
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.js?$/,
                enforce: 'pre',
                loader: 'source-map-loader'
            }
        ]
    },
    devtool: 'nosources-source-map',
    node: {
        __dirname: true
    }
};
