const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: './src/main.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    libraryTarget: 'umd' // 添加输出库配置
  },
  resolve: {
    extensions: ['*', '.ts', '.js'],
    alias: {
      '@': path.resolve(__dirname, '../src')
    },
    symlinks: false
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
    ]
  },
  devServer: {
    hot: true,
    contentBase: './src/main.ts',
    open: true
  },
  plugins: [new webpack.ProgressPlugin()]
}
