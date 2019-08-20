const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const rootFolder = path.resolve(__dirname, '..', '..');

module.exports = {
  context: rootFolder,
  entry: path.resolve(rootFolder, 'src', 'index.tsx'),
  output: {
    filename: 'main.js',
    path: path.resolve(rootFolder, 'dist'),
    publicPath: '/dist/',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    modules: [path.resolve(rootFolder, 'src'), 'node_modules'],
    plugins: [new ModuleScopePlugin(path.resolve(rootFolder, 'src'))],
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          { loader: 'thread-loader' },
          {
            loader: 'babel-loader',
          },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              happyPackMode: true,
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Todos',
      filename: 'index.html',
      template: path.resolve(rootFolder, 'src', 'index.html'),
    }),
    new ForkTsCheckerWebpackPlugin(),
  ],
};
