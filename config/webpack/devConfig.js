const autoprefixer = require('autoprefixer');
const path = require('path');
const webpackMerge = require('webpack-merge');

const baseConfig = require('./baseConfig');

const workingDirectory = process.cwd();

module.exports = webpackMerge(baseConfig, {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]__[local]~[hash:base64:5]',
              },
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [autoprefixer],
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
  devServer: {
    contentBase: path.resolve(workingDirectory, 'public'),
    hot: true,
    port: 8080,
  },
  devtool: 'inline-source-map',
});
