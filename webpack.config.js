const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const resolve = file => path.resolve(__dirname, file)

module.exports = {
  entry: {
    app: './entry.js',
  },
  output: {
    path: resolve('./dist/img'),
    publicPath: '/dist/img/',
    filename: '../js/[name].js'
  },
  resolve: {
    extensions: ['.js', '.scss']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[ext]?[hash:8]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: '../fonts/[name].[ext]?[hash:8]'
        }
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('../css/style.css'),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module) {
        return (
          /node_modules/.test(module.context) &&
          !/\.css$/.test(module.request)
        )
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest'
    })
  ],
  stats: {
    children: false
  }
}
