const {resolve} = require('path');
const webpack = require('webpack');

var version = process.env.npm_package_version;

module.exports = {

  entry: resolve('./src/deckgl.js'),

  // Generate a bundle in dist folder
  output: {
    path: resolve('./dist'),
    filename: `deckgl-${version}.min.js`,
  },

  devtool: '',

  resolve: {
    alias: {
      // 'deck.gl': resolve('./node_modules/deck.gl/dist/core')
    }
  },

  module: {
    rules: [
      {
        // Compile ES2015 using babel
        test: /\.js$/,
        loader: 'babel-loader',
        include: [/src/, /node_modules\/lave/],
        options: {
          presets: ['es2015']
        }
      }
    ]
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin({comments: false})
  ]
};
