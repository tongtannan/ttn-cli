
module.exports = {
  withDev(config) {
    const path = require('path');

    config.mode = 'development';

    config.output = {
      ...config.output,
      publicPath: '/',
      filename: '[name].js',
      chunkFilename: '[name].js',
    };

    config.module.rules[0].use[0].options = {
      ...config.module.rules[0].use[0].options,
      hmr: true,
      publicPath: '/',
    };

    config.devServer = {
      contentBase: path.join(__dirname, '..', 'dist', 'qcadmin', 'static'),
      open: true,
      disableHostCheck: true,
      historyApiFallback: true,
      hot: true,
      proxy: {
        '/api': {
          target: ``,
          logLevel: 'debug',
          changeOrigin: true,
        },
      },
    };

    config.devtool = 'inline-source-map';

    config.watch = true;
  },
};
