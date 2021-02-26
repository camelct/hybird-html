const WebpackCleanupPlugin = require("webpack-cleanup-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const FriendlyErrorWebpackPlugin = require("friendly-errors-webpack-plugin");

const config = require("./conf.js");
const util = require("./util.js");

const { entry, htmlWebpackPlugins } = util.setMPA();

const webpackConfig = {
  entry,
  output: {
    path: config.distRoot,
    filename: "js/[name].js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: "babel-loader",
          },
        ],
        include: config.srcRoot,
      },
      {
        test: /\.(sa|sc|c|le)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "px2rem-loader",
            options: {
              remUni: 75,
              remPrecision: 8,
            },
          },
          "less-loader",
          {
            loader: "postcss-loader",
            options: {
              plugins: () => [
                require("autoprefixer")({
                  // 兼容到版本
                  overrideBrowserslist: ["last 2 version", ">1%", "IOS 7"],
                }),
              ],
            },
          },
        ],
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: require.resolve("url-loader"),
        options: {
          limit: 10000,
          name: "static/images/[name].[ext]",
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10000,
              name: "static/font/[name].[ext]",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new WebpackCleanupPlugin(),
    new FriendlyErrorWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
    }),
  ].concat(htmlWebpackPlugins),
  // 提取公共文件
  optimization: {
    splitChunks: {
      minSize: 0,
      cacheGroups: {
        commons: {
          name: "common",
          chunks: "all",
          minChunks: 2,
        },
      },
    },
  },
  stats: "errors-only",
};

module.exports = webpackConfig;
