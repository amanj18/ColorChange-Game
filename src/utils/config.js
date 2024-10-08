const config = {};
config.isMobile = () => {
  return /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

config.entity = 'd3@t4N0te!';
config.platformId = 1;
config.optType = 1;

export default config;
