const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  infrastructureLogging: {
    colors: true,
    level: 'verbose',
  },
  devServer: {
    static: false,
    client: {
      logging: 'error',
    },
    open: true,
    allowedHosts: 'all',
    historyApiFallback: true,
    hot: true,
    port: 8200,
    proxy: {
      // '/api': {
      //   target: `https://cqcp.${env}.${LOCALE_DOMAIN_MAPPING[locale]}`,
      //   changeOrigin: true,
      // },
      // '/chat': {
      //   target: `https://cqcp.${env}.${LOCALE_DOMAIN_MAPPING[locale]}`,
      //   changeOrigin: true,
      // },
    },
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './public/index.html',
      inject: true,
    }),
  ],
});
