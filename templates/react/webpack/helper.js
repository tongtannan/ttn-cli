const env = process.env.ENV || 'test';
const locale = process.env.LOCALE || 'ID';

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
      publicPath: '/',
    };

    config.infrastructureLogging = {
      colors: true,
      level: 'verbose',
    };

    config.devServer = {
      static: {
        directory: path.join(__dirname, '..', 'dist', 'qcadmin', 'static'),
        publicPath: '/',
        serveIndex: true,
        watch: true,
      },
      client: {
        logging: 'error',
      },
      open: true,
      allowedHosts: 'all',
      historyApiFallback: true,
      hot: true,
      port: 8888,
      proxy: {
        '/api': {
          target: `https://cqcp.test.com`,
          changeOrigin: true,
        },
      },
    };

    config.devtool = 'eval-cheap-module-source-map';
  },
};
