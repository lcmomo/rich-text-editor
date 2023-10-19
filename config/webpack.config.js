const argv = require('yargs-parser')(process.argv.slice(2)); // 获取命令行参数
const _mode = argv.mode || 'development';
const _modeflag = (_mode == "production" ? true : false);
const _mergeConfig = require(`./webpack.${_mode}.js`); // 当前环境的配置文件

const { merge } = require('webpack-merge');
const { resolve } = require('path');

// const webpack = require('webpack');

// const WebpackDeepScopeAnalysisPlugin = require('webpack-deep-scope-plugin').default
const { CheckerPlugin } = require('awesome-typescript-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
// const DashboardPlugin = require('webpack-dashboard/plugin');
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

const appPath = resolve('src');

const webpackConfig = {
  entry: {
    app: resolve('./src/index.ts'),
    // vendor: ['react', 'react-dom'] // 不变的代码分包
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, '../src'),
    },
    extensions: ['.ts', '.tsx', '.js', 'jsx']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: [appPath],
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(ts|tsx)$/,
        include: [appPath],
        exclude: /node_modules/,
        loader: 'ts-loader'
      },
      {
        test: /\.(css|less)$/,
        include: [appPath],
        // exclude: /node_modules/,
        use: [
          // [style-loader](/loaders/style-loader)
          // { loader: 'style-loader' },
          { loader: MiniCssExtractPlugin.loader },
          // [css-loader](/loaders/css-loader)
          {
            loader: 'css-loader',
            // options: {
            //   modules: true
            // }
          },
          // [sass-loader](/loaders/sass-loader)
          { loader: 'less-loader' }
        ]
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        include: [`${appPath}/assets`],
        exclude: /node_modules/,
        loader: 'file-loader',
        options: {
          publicPath: '/assets/img',
          outputPath: '/assets/img',
          name: '[name].[hash:5].[ext]'
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
              name: '[name].[hash:5].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // new WebpackDeepScopeAnalysisPlugin(),
    // new webpack.DefinePlugin({
    //   'process.env': {
    //     'NODE_ENV': _mode
    //   }
    // }),
    new WebpackManifestPlugin(),
    new CheckerPlugin(),
    new MiniCssExtractPlugin({
      filename: _modeflag ? "css/[name].[hash:5].css" : "css/[name].css",
      chunkFilename: _modeflag ? "css/[id].[hash:5].css" : "css/[name].css"
    }),
    new HtmlWebpackPlugin({
      filename:"index.html",
      template:"examples/index.html"
    }),
    new ProgressBarPlugin(),
    new BundleAnalyzerPlugin({
      openAnalyzer: false,
      analyzerMode: 'static'
    }),
    new NodePolyfillPlugin()
    // new DashboardPlugin(),
  ]
}

module.exports = merge(webpackConfig, _mergeConfig);
