const slsw = require('serverless-webpack');
const path = require('path');
module.exports = {
    entry: path.join(__dirname, 'handler.js'),
    target: 'node',
    output: {
        libraryTarget: 'commonjs',
        path: path.join(__dirname, '.webpack'),
        filename: 'handler.js'
    },
  };