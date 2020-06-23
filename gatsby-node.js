const path = require('path');

// Webpack config
exports.onCreateWebpackConfig = ({ actions }) => {

  // Tell webpack where to look when using alias in importing component and more
  actions.setWebpackConfig({
    resolve: {
      alias: {
        components: path.resolve(__dirname, 'src/components'),
        config    : path.resolve(__dirname, 'src/config'),
        contexts  : path.resolve(__dirname, 'src/contexts'),
        hooks     : path.resolve(__dirname, 'src/hooks'),
        images    : path.resolve(__dirname, 'src/images'),
        store     : path.resolve(__dirname, 'src/store'),
        styles    : path.resolve(__dirname, 'src/styles')
      }
    }
  });

};
