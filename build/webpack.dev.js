const webpack = require('webpack');

const webpackConfig = require('./webpack.conf.js');
const merge = require('webpack-merge');

const webpackDevConfig = {
  mode: 'development',
  plugins: [new webpack.HotModuleReplacementPlugin()],
  devtool: '#eval-source-map-inline'
}

module.exports = merge(webpackConfig, webpackDevConfig);