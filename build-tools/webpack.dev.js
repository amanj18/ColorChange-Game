const commonPaths = require('./common-paths');

const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const { createProxyConfiguration } = require('./utils');

const PORT = process.env.PORT || 3000;
const HOST = 'localhost';

const config = (proxy) => {
  return {
    mode: 'development',
    // devtool: 'source-map',
    devServer: {
      historyApiFallback: true,
      host: HOST,
      port: PORT,
      static: {
        directory: commonPaths.outputPath
      },
      open: true,
      hot: true,
      proxy: createProxyConfiguration(proxy)
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/, //kind of file extension this rule should look for and apply in test
          exclude: /node_modules/, //folder to be excluded
          use: [
            {
              loader: require.resolve('babel-loader'),
              options: {
                cacheCompression: false,
                cacheDirectory: true,
                plugins: [require.resolve('react-refresh/babel')].filter(Boolean)
              }
            }
          ]
        },
        {
          test: /\.(s(a|c)ss)$/,
          use: ['style-loader', 'css-loader', 'sass-loader']
        }
      ]
    },
    plugins: [
      new ReactRefreshWebpackPlugin({
        forceEnable: true
      })
    ]
  };
};

module.exports = config;
