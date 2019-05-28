const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/app.js',

  output: {
    publicPath: '/assets/',
    path: path.join(__dirname,'assets'),
    filename: 'app.js'
  },

  externals: {
    jquery: 'jQuery'
  },

  resolve: {
    extensions: ['.js','.ts'],
    alias: {
      vue: 'vue/dist/vue.js',
    }
  },

  devServer: {
    contentBase: path.join(__dirname, './'),
    compress: true,
    port: 9000
  },

  // source map
  devtool: 'source-map',

  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },

  plugins: [
    //new webpack.optimize.UglifyJsPlugin({minimize: true})
    new VueLoaderPlugin()
  ]
};
