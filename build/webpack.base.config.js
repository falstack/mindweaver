const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const resolve = file => path.resolve(__dirname, file)
const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  devtool: isProd ? false : 'cheap-module-source-map',
  output: {
    path: resolve('../dist/assets/img'),
    publicPath: '/assets/img/',
    filename: '../js/[name].[chunkhash:8]..js'
  },
  resolve: {
    extensions: ['.js', '.vue', '.scss'],
    alias: {
      'vue$': 'vue/dist/vue.common.js',
      'view': resolve('../src/views'),
      'assets': resolve('../src/assets'),
      'layout': resolve('../src/views/layouts'),
      'service': resolve('../src/services'),
      'component': resolve('../src/components')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader',
            options: {
              extractCSS: process.env.NODE_ENV === 'production',
              preserveWhitespace: false,
              postcss: [
                require('autoprefixer')({
                  browsers: [
                    'last 3 versions'
                  ]
                })
              ],
              loaders: {
                scss: [
                  'vue-style-loader',
                  'css-loader',
                  'sass-loader',
                  {
                    loader: 'sass-resources-loader',
                    options: {
                      resources: [
                        resolve('../src/assets/css/variables.scss'),
                        resolve('../src/assets/css/mixins.scss')
                      ]
                    }
                  }
                ],
              },
            }
          }
        ]
      },
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
      },
      {
        test: /\.(js|vue)?$/,
        loader: 'eslint-loader',
        options: {
          enforce: 'pre',
          cacheDirectory: true
        },
        exclude: /(node_modules)/
      },
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({

    })
  ].concat(isProd
    ? [
      new webpack.optimize.UglifyJsPlugin({
        compress: { warnings: false }
      }),
      new ExtractTextPlugin({
        filename: '../css/common.[chunkhash:8].css'
      }),
      new webpack.optimize.ModuleConcatenationPlugin()
    ]
    : [
      new FriendlyErrorsPlugin()
  ])
}
