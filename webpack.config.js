const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const resolve = file => path.resolve(__dirname, file)

module.exports = {
  entry: {
    app: './src/entry.js',
    vendor: [
      'vue',
      'vuex',
      'vue-router',
    ]
  },
  output: {
    path: resolve('./dist/assets/img'),
    publicPath: '/assets/img/',
    filename: '../js/[name].js'
  },
  resolve: {
    extensions: ['.js', '.vue', '.scss'],
    alias: {
      'vue$': 'vue/dist/vue.common.js',
      'view': resolve('./src/views'),
      'assets': resolve('./src/assets'),
      'layout': resolve('./src/views/layouts'),
      'service': resolve('./src/services'),
      'component': resolve('./src/components')
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
              extractCSS: true,
              postcss: [
                require('autoprefixer')({
                  browsers: [
                    'last 3 versions'
                  ]
                })
              ],
              loaders: {
                scss: ExtractTextPlugin.extract({
                  fallback: 'vue-style-loader',
                  use: [
                    'css-loader',
                    'sass-loader',
                    {
                      loader: 'sass-resources-loader',
                      options: {
                        resources: [
                          resolve('./src/assets/css/variables.scss'),
                          resolve('./src/assets/css/mixins.scss')
                        ]
                      }
                    }
                  ]
                })
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
    }),
    new webpack.ProvidePlugin({

    })
  ],
  stats: {
    children: false
  }
}
