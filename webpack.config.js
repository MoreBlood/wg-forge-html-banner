const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { HotModuleReplacementPlugin } = require('webpack');

module.exports = {
  entry: './js/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'js/app.bundle.js',
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: [
            ['es2015', { modules: false }],
            'es2016',
            'es2017',
            'stage-2',
          ],
        },
      },
    ],
  },
  plugins: [
    new HotModuleReplacementPlugin(),
    new CopyWebpackPlugin([
      {
        from: 'index.html',
        to: '',
        toType: 'file',
      },
      {
        from: 'node_modules/tweenjs/lib/tweenjs.min.js',
        to: 'lib',
        toType: 'dir',
      },
      {
        from: 'node_modules/easeljs/lib/easeljs.min.js',
        to: 'lib',
        toType: 'dir',
      },
    ]),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'build'),
    compress: true,
    port: 9000,
  },
  stats: {
    colors: true,
  },
  devtool: 'source-map',
};
