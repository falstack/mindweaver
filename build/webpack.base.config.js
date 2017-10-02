const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const resolve = file => path.resolve(__dirname, file)
const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  devtool: isProd ? 'sourcemap' : false,
  output: {
    path: resolve('../dist'),
    publicPath: '/dist/',
    filename: '[name].[chunkhash].js'
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
    noParse: /es6-promise\.js$/,
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
                    'last 3 versions',
                    'ie >= 8',
                    'ie_mob >= 10',
                    'ff >= 26',
                    'chrome >= 30',
                    'safari >= 6',
                    'opera >= 23',
                    'ios >= 5',
                    'android >= 2.3',
                    'bb >= 10'
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
                ]
              }
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
          name: '[name].[ext]?[hash:8]'
        }
      },
      {
        test: /\.css$/,
        use: isProd
          ? ExtractTextPlugin.extract({
            use: 'css-loader?minimize',
            fallback: 'vue-style-loader'
          })
          : ['vue-style-loader', 'css-loader']
      },
      {
        test: /\.(js|vue)$/,
        exclude: /node_modules/,
        use: {
          loader: 'eslint-loader',
          options: {
            enforce: 'pre',
            cacheDirectory: true
          }
        }
      }
    ]
  },
  performance: {
    maxEntrypointSize: 300000,
    hints: isProd ? 'warning' : false
  },
  plugins: [
    new webpack.ContextReplacementPlugin(/moment[\\\/]locale$/, /^\.\/(zh-cn|zh-tw)$/),
    new webpack.ProvidePlugin({
      _: 'lodash'
    })
  ].concat(isProd
    ? [
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: true,
        compress: {
          warnings: false
        }
      }),
      new ExtractTextPlugin({
        filename: 'common.[chunkhash].css'
      }),
      new webpack.optimize.ModuleConcatenationPlugin(),
      new CompressionPlugin({
        asset: '[path].gz[query]',
        algorithm: 'gzip',
        test: /\.(js|css|json)$/,
        threshold: 10240,
        minRatio: 0.8
      })
    ]
    : [
      new FriendlyErrorsPlugin()
    ])
}
