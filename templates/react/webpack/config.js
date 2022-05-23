const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const { withDev } = require('./helper');

const env = process.env.NODE_ENV || 'development';
const isDev = env === 'development';

const config = {
  mode: 'production',
  output: {
    path: path.join(__dirname, '..', 'dist', 'qcadmin', 'static'),
    publicPath: '/static/',
    filename: '[name]-[chunkhash].js',
    chunkFilename: '[name]-[chunkhash].js',
  },
  target: 'web',
  resolve: {
    extensions: ['*', '.ts', '.tsx', '.js', '.json'],
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify({
        NODE_ENV: isDev ? 'development' : 'production',
      }),
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      nodeEnv: env,
      favicon: './src/favicon.ico',
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
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[name].[contenthash].css',
    }),

    new MomentLocalesPlugin({
      localesToKeep: ['es-us'],
    }),

    new CssMinimizerPlugin(),
  ],

  module: {
    rules: [
      {
        test: /node_modules.*\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '/static/',
              reloadAll: true,
            },
          },
          { loader: 'css-loader' },
        ],
      },
      {
        test: /\.less$/,
        exclude: /node_modules\/antd/,
        use: [
          {
            loader: isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                localIdentName: '[local]_[hash:base64:5]',
              },
            },
          },
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
            },
          },
        ],
      },
      {
        test: /\.less$/,
        include: /node_modules\/antd/,
        use: [
          {
            loader: isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
            },
          },
        ],
      },

      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
        options: {
          plugins: [isDev && require.resolve('react-refresh/babel')].filter(Boolean),
        },
      },
      {
        test: /\.(png|jpg|jpeg|gif|eot|woff|svg|ttf)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 2048,
            },
          },
        ],
      },
    ],
  },
};

if (isDev) {
  withDev(config);
}

module.exports = config;
