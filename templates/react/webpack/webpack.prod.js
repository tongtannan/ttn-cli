const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

const common = require('./webpack.common.js');
const utils = require('./scripts/utils');

module.exports = merge(common, {
  mode: 'production',
  devtool: false,
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js'),
  },
  cache: {
    type: 'filesystem',
    compression: 'gzip',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      minChunks: 1,
      maxInitialRequests: Infinity,
      minSize: 0,
      maxSize: 1024 * 100, // 100k
    },
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css'),
      chunkFilename: utils.assetsPath('css/[name].[contenthash].css'),
    }),
    new CompressionPlugin({
      test: /\.js|css/,
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: path.resolve(__dirname, '../dist/index.html'),
      favicon: './public/favicon.ico',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
  ],
});
