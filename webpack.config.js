var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: './src/index',
  devtool: 'source-map',
  resolve: {
    root: path.resolve('./src'),
    extensions: ['', '.js'],
    fallback: [path.join(__dirname, 'node_modules')]
  },
  resolveLoader: {
    fallback: [path.join(__dirname, 'node_modules')]
  },
  output: {
    path: __dirname + '/lib',
    filename: 'index.js',
    // library: 'pr-common',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  plugins: [
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.ProvidePlugin({
      'React': 'react'
    }),
    new webpack.ProvidePlugin({
      'ReactDOM': 'react-dom'
    }),
  ],
  module: {
    loaders: [{
      test: /(\.jsx|\.js)$/,
      loader: 'babel',
      exclude: /node_modules/,
      query: {
        compact: false
      },
    }]
  },
  externals: {
    'alt': 'alt/lib',
    'react': 'react',
    'axios': 'axios',
    'react-dom': 'react-dom',
    'react-router': 'react-router',
    'material-ui': 'material-ui'
  }
};
