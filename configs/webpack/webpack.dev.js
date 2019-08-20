const dotenv = require('dotenv');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common');

dotenv.config();

console.log(process.env.API_URL);
module.exports = merge(common, {
  mode: 'development',
  devtool: 'cheap-eval-source-map',
  devServer: {
    port: 5555,
    hot: true,
    proxy: [
      {
        path: '/api',
        target: process.env.API_URL,
        pathRewrite: { '^/api': '' },
        secure: false,
        changeOrigin: true,
      },
    ],
    historyApiFallback: {
      index: '/dist/index.html',
    },
  },
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(false),
      API_URL: JSON.stringify(process.env.API_URL),
    }),
  ],
});
