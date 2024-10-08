const { projectRoot } = require('../common-paths');
const path = require('path');
const { proxies } = require('./config');

module.exports = {
  createPathAliases: () => {
    const aliasMappings = {
      components: 'src/components/',
      ui: 'src/components/ui/',
      assets: 'src/assets/',
      utils: 'src/utils/',
      api: 'src/api/',
      hooks: 'src/hooks/',
      pages: 'src/pages/',
      store: 'src/store/',
      router: 'src/router'
    };

    let mapping = {};

    for (let [key, value] of Object.entries(aliasMappings)) {
      mapping[key] = path.resolve(projectRoot, value);
    }

    return mapping;
  },

  createProxyConfiguration: (proxyEnv) => {
    return proxies.map((proxy) => {
      const targetProxy = proxy.target.replace('{{proxyEnv}}', proxyEnv);

      return {
        context: proxy.source,
        target: targetProxy,
        changeOrigin: true,
        secure: false,
        onProxyReq: (proxyReq) => {
          proxyReq.setHeader('Origin', targetProxy);
        }
      };
    });
  }
};
