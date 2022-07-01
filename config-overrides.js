const { alias } = require('react-app-rewire-alias');

module.exports = function override(config) {
  alias({
    '@assets': 'src/assets',
    '@common': 'src/common',
    '@components': 'src/components',
    '@containers': 'src/containers',
    '@context': 'src/context',
    '@layouts': 'src/layout',
    '@pages': 'src/pages',
    '@routes': 'src/routes',
    '@services': 'src/services',
    '@styles': 'src/styles',
    '@redux': 'src/redux',
    '@utils': 'src/utils'
  })(config);

  return config;
};
