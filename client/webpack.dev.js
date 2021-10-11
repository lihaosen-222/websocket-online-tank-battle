// webpack.dev.js 运行代码的配置（该文件暂时用不到，先创建了，下文会用到）
const path = require('path')
const webpackCommonConf = require('./webpack.common.js')
const { merge } = require('webpack-merge')
const srcPath = path.join(__dirname, 'src')
const distPath = path.join(__dirname, 'dist')
const webpack = require('webpack')

module.exports = merge(webpackCommonConf, {
  mode: 'development',
  output: {
    filename: 'bundle.js',
    path: distPath,
  },
  plugins: [
    new webpack.DefinePlugin({
      ENV: JSON.stringify('development')
    })
  ],
  devServer: {
    port: 3000,
    open: true
  }

})


