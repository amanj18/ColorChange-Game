const commonPaths = require("./common-paths");
const WebpackBar = require("webpackbar");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackStatsPrettifyPlugin = require("webpack-stats-prettify-plugin");

const config = () => {
  return {
    mode: "production",
    devtool: "source-map",
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ["babel-loader"],
        },
        {
          test: /\.(s(a|c)ss)$/,
          use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        ignoreOrder: false,
      }),
      new WebpackManifestPlugin({
        fileName: "asset-manifest.json",
        writeToFileEmit: true,
        publicPath: commonPaths.publicPath,
        filter: (file) => file.path.endsWith(".js"),
      }),
      new WebpackStatsPrettifyPlugin(),
      new WebpackBar(),
    ],
  };
};

module.exports = config;
