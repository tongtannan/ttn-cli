const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const { env, isDev } = require('./scripts/constants');
const utils = require('./scripts/utils');

module.exports = {
  entry: {
    index: path.resolve(__dirname, '../src/index.tsx'),
  },
  output: {
    path: path.join(__dirname, '../dist/static'),
    filename: '[name].js',
    publicPath: isDev ? '/' : '/',
    clean: true,
    pathinfo: false,
  },
  target: 'web',
  cache: true,
  resolve: {
    extensions: ['*', '.ts', '.tsx', '.js', '.json'],
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
    symlinks: false,
  },
  module: {
    rules: [
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
              lessOptions: {
                javascriptEnabled: true,
              },
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
              lessOptions: {
                javascriptEnabled: true,
                modifyVars: {
                  'primary-color': '#2673dd',
                },
              },
            },
          },
        ],
      },

      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          },
        ],
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10 * 1024,
              name: utils.assetsPath('images/[name].[hash:7].[ext]'),
            },
          },
        ],
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10 * 1024,
          name: utils.assetsPath('medias/[name].[hash:7].[ext]'),
        },
      },
      {
        test: /\.(ttf|woff|woff2|eot|otf)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10 * 1024,
              name: utils.assetsPath('fonts/[name].[hash:7].[ext]'),
            },
          },
        ],
      },
    ],
  },
  plugins: [],
};
