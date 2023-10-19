const { resolve } = require('path');
const appPath = resolve('src/client');
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');
// const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const PreloadWebpackPlugin = require('preload-webpack-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const publicPath = resolve(process.cwd(), 'dist');
const webpackConfig = {
  output: {
    filename: '[name].[contenthash:5].js', // contenthash： 只有模块内容改变，才会改变hash
    publicPath: '/',
    path: publicPath
  },

  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        include: [`${appPath}/assets`],
        exclude: /node_modules/,
        loader: 'file-loader',
        options: {
          publicPath: '/assets/img',
          name: '[name].[contenthash:5].[ext]'
        },
      },

      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        include: [`${appPath}/assets`],
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: '@svgr/webpack',
            options: {
              babel: false,
              icon: true,
              name: '[name].[contenthash:5].[ext]'
            }
          }
        ]
      }
    ]
  },

  optimization: {
    minimizer: [
      new CssMinimizerPlugin({
        exclude: /node_modules/,
        parallel: 4
      }),
      new TerserPlugin()
    ],
    splitChunks: {
      chunks: 'all',
      minChunks: 2,
      maxInitialRequests: 5,
      cacheGroups: {
        // 提取公共模块
        commons: {
          chunks: 'all',
          test: /[\\/]node_modules[\\/]/,
          minChunks: 2,
          maxInitialRequests: 5,
          minSize: 0,
          name: 'common'
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
      }
    },
    runtimeChunk: {
      name: "runtime"
    }
  },
  plugins: [
    new WebpackBuildNotifierPlugin({
      title: 'My Webpack Build',
      // logo: "",
      suppressSuccess: true
    }),
    new CleanWebpackPlugin(),
    // new PreloadWebpackPlugin({
    //   rel: 'preload',
    //   as(entry) {
    //     if (/\.css$/.test(entry)) return 'style';
    //     if (/\.woff$/.test(entry)) return 'font';
    //     if (/\.png$/.test(entry)) return 'image';
    //     return 'script';
    //   }
    // })
  //   new webpack.DefinePlugin({
  //     "process.env": {
  //     NODE_ENV: JSON.stringify("production")
  //     }
  // })
  ]
}

module.exports = webpackConfig;
