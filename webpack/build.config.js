const {resolve} = require('path');
const webpack = require('webpack');

module.exports = {

  entry: resolve('./src'),

  // Generate a bundle in dist folder
  output: {
    path: resolve('./dist'),
    filename: 'index.js',
    library: 'deckgl-runkit',
    libraryTarget: 'umd'
  },

  externals: [
    '@runkit/value-viewer',
    'escodegen',
    'lave'
  ],

  devtool: '',

  node: {
    process: false
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
  }
};
