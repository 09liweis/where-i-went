var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'public/js');
var APP_DIR = path.resolve(__dirname, 'components/dashboard');

var config = {
        entry: APP_DIR + '/dashboard.js',
    output: {
        path: BUILD_DIR,
        filename: 'bundle.js'
    },
  module: {
        loaders: [
            {
                test: /\.jsx?/,
                include: APP_DIR,
                loader: 'babel-loader'
            }
        ]
  }
};

module.exports = config;