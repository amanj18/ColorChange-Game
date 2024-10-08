const commonConfig = require('./build-tools/webpack.common.js');
const { merge } = require('webpack-merge');

module.exports = ({ env, proxy }) => {
  const webpackConfig = env === 'local' ? 'dev' : 'prod';

  const envConfig = require(`./build-tools/webpack.${webpackConfig}.js`);
  const mergedConfig = merge(commonConfig(env), envConfig(proxy));

  return mergedConfig;
};
