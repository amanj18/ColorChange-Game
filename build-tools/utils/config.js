module.exports = {
  proxies: [
    {
      source: ['/static-assets', '/apis/services'],
      target: 'https://{{proxyEnv}}-goldentracks-votes.european-athletics.com'
    }
  ]
};
