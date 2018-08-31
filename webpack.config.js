const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: './js/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'js/app.bundle.js',
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin(),
    ],
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: [
            'env',
          ],
        },
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: 'index.html',
        to: '',
        toType: 'file',
      },
      {
        from: 'assets/',
        to: 'assets',
        toType: 'dir',
      },
      {
        from: 'scripts/',
        to: 'scripts',
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
};
