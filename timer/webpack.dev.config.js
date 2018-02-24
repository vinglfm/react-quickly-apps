const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const config = {
  entry: {
    app: path.join(__dirname, '/index.jsx')
  },
  output: {
    path: path.join(__dirname, '/build'),
    filename: 'bundle.js'
  },
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        include : __dirname,
        exclude : path.join(__dirname, 'server'),
        loaders : ['react-hot-loader/webpack','babel-loader']
      },
      {
        test: /\.css$/,
        include : __dirname,
        loader: "style-loader!css-loader"
      },
      {
        test:   /\.wav$/,
        loader: 'url-loader',
        options:  {
          limit: 80000
        }
      }
    ]
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, '/build'),
    hot: true
  },
  plugins: [
      new CleanWebpackPlugin(['build']),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'index.html')
      }),
     new webpack.NamedModulesPlugin(),
     new webpack.HotModuleReplacementPlugin()]
};

module.exports = config;
