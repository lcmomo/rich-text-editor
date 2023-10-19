
const { join, resolve } = require('path');
const appPath = resolve('src');
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// const webpack = require('webpack');
const webpackConfig = {
  target:  "web",
  output: {
    filename: '[name].[hash:5].js',
    publicPath: '/',
    path: resolve(process.cwd(), 'dist')
  },

  module: {
    rules: [
      //   // 把这个配置放在所有loader之前
      // {
      //   enforce: 'pre',
      //   test: /\.tsx?$/,
      //   exclude: /node_modules/,
      //   // include: [appPath],
      //   loader: 'eslint-loader',
      //   options: {
      //     emitWarning: true, // 这个配置需要打开，才能在控制台输出warning信息
      //     emitError: true, // 这个配置需要打开，才能在控制台输出error信息
      //     fix: false // 是否自动修复，如果是，每次保存时会自动修复可以修复的部分
      //   }
      // },
      
    ]
  },
  devServer: {
    historyApiFallback: true,
    // static: {
    //   directory: join(__dirname, '../dist')
    // },
    contentBase: join(__dirname, "../dist"),
    // open: {
    //   target: ['/dist/index.html'],
    // },
    // devMiddleware: {
    //   // index: true,
    //   // mimeTypes: { 'text/html': ['phtml'] },
    //   // publicPath: join(__dirname, '../dist'),
    //   // serverSideRender: true,
    //   // writeToDisk: true,
    // },
    // historyApiFallback: {
    //   rewrites: [
    //     { from: /^\/$/, to: '/dist/index.html' },
    //   ],
    // },
    compress: true,
    // proxy: {
    //   'api': 'http://localhost:3001'
    // },

    hot: true,
    port: 8080
  },
  plugins: [
    new WebpackBuildNotifierPlugin({
      title: 'My Webpack Build',
      // logo: "",
      suppressSuccess: true
    }),
    // new BundleAnalyzerPlugin({
    //   openAnalyzer: false,
    //   analyzerMode: 'static'
    // })
    // new webpack.HotModuleReplacementPlugin()
  ]
}

module.exports = webpackConfig;
