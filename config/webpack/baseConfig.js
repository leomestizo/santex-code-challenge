const path = require('path');
const miniSvgDataUri = require('mini-svg-data-uri');

const workingDirectory = process.cwd();
const srcDirectory = path.resolve(workingDirectory, 'src');

module.exports = {
  context: srcDirectory,
  entry: './index.jsx',
  output: {
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js(x)?$/,
        loader: 'babel-loader',
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              generator: (content) => miniSvgDataUri(content.toString()),
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      assets: path.resolve(srcDirectory, 'assets'),
      components: path.resolve(srcDirectory, 'components'),
      constants: path.resolve(srcDirectory, 'constants'),
      hocs: path.resolve(srcDirectory, 'hocs'),
      hooks: path.resolve(srcDirectory, 'hooks'),
      utils: path.resolve(srcDirectory, 'utils'),
    },
  },
};
