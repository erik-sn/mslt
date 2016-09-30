/**
 * This config file is specific to development. When we run "node server.js"
 * the server.js file uses the WebpackDevServer with this file as a configuration.
 *
 * This webpack is configured for hot reloading and SASS transpiling.
 */

var path = require('path');
var webpack = require('webpack');
require('es6-promise').polyfill();

module.exports = {
  // see https://webpack.github.io/docs/configuration.html#devtool
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './src/index',
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/',
  },
  plugins: [
    // enable hot module replacement
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        BROWSER: JSON.stringify(true),
      },
    }),
  ],
  module: {
    // react-hot MUST be before babel
    loaders: [{
      test: /\.js$/,
      loaders: ['react-hot', 'babel'],
      include: path.join(__dirname, 'src'),
    },
    {
      test: /\.scss$/,
      loaders: ['style', 'css', 'sass'],
    },
    {
      test: /\.jpe?g$|\.gif$|\.png$/i,
      loader: 'file-loader?name=/img/[name].[ext]',
    },
    ],
  },
  resolve: {
    alias: {
      'react': path.join(__dirname, 'node_modules', 'react'),
    },
    extensions: ['', '.js'],
  },
};
