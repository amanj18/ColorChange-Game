const path = require('path');
const commonPaths = require('./common-paths');
const TerserPlugin = require('terser-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { createPathAliases } = require('./utils');

const { projectRoot, appEntry, outputPath, publicPath } = commonPaths;

const config = (env) => {
  return {
    entry: appEntry,
    cache: {
      type: 'filesystem'
    },
    output: {
      path: outputPath,
      publicPath: publicPath,
      filename: '[name].[contenthash].js',
      chunkFilename: 'static/[name].[contenthash].chunk.js',
      assetModuleFilename: 'images/[path][name][ext]',
      clean: true
    },
    // output: {
    //   path: path.resolve(__dirname, 'dist'),
    //   filename: '[name].[hash:8].js',
    //   sourceMapFilename: '[name].[hash:8].map',
    //   chunkFilename: '[id].[hash:8].js'
    // },
    target: 'web',
    resolve: {
      alias: createPathAliases(),
      extensions: ['.js', '.jsx', '.json']
    },
    module: {
      rules: [
        {
          // extend the support for font files
          test: /\.(png|jpg|gif|xml|ico|svg)$/i,
          type: 'asset/resource'
        }
      ]
    },
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            format: {
              comments: false
            },
            compress: {
              drop_console: true
            }
          },
          extractComments: false
        })
      ],
      splitChunks: {
        chunks: 'all',
        minSize: 0,
        cacheGroups: {
          vendor: {
            name: 'node_vendors',
            test: /[\\/]node_modules[\\/]/,
            chunks: 'all',
            enforce: true
          },
          common: {
            name: 'components',
            test: /[\\/]src[\\/]components[\\/]/,
            chunks: 'all',
            minSize: 0
          }
        }
      }
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(projectRoot, 'public', 'index.html'),
        inject: true,
        publicPath: publicPath,
        chunks: 'all',
        chunksSortMode: 'auto',
        minify: 'auto',
        title: 'Quiz'
      }),
      new Dotenv({
        path: `./.env.${env}`
      })
    ]
  };
};

module.exports = config;
