const merge = require("webpack-merge");
const cssnano = require("cssnano");

const webpackConfig = require("./webpack.conf.js");
const EncodingPlugin = require("webpack-encoding-plugin");

const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlWebpackExternalsPlugin = require("html-webpack-externals-plugin");

const webpackProdConfig = {
  mode: "production",
  plugins: [
    new OptimizeCSSAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: cssnano,
    }),
    new EncodingPlugin({
      encoding: "utf-8",
    }),
  ],
};

module.exports = merge(webpackConfig, webpackProdConfig);
