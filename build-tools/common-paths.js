const path = require('path');
const PROJECT_ROOT = process.cwd();
const ASSETS_PATH =
  process.env.NODE_ENV === 'development'
    ? ''
    : 'https://staging-goldentracks-votes.european-athletics.com/static-assets/build/';

module.exports = {
  projectRoot: PROJECT_ROOT,
  outputPath: path.join(PROJECT_ROOT, 'dist'),
  appEntry: path.join(PROJECT_ROOT, 'src/index.js'),
  publicPath: ASSETS_PATH
};
