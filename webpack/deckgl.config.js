const {resolve} = require('path');
const webpack = require('webpack');

module.exports = {

  entry: resolve('./src/deckgl.js'),

  // Generate a bundle in dist folder
  output: {
    path: resolve('./dist'),
    filename: 'deckgl.min.js',
  },

  devtool: '',

  resolve: {
    alias: {
      'deck.gl': resolve('./node_modules/deck.gl/dist/core'),
      'deck.gl-core': resolve('./node_modules/deck.gl/dist/core'),
      'deck.gl-layers': resolve('./node_modules/deck.gl/dist/core-layers')
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
