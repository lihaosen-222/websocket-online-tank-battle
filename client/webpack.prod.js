
// webpack.prod.js 打包代码的配置
const path = require('path')
const webpackCommonConf = require('./webpack.common.js')
const {merge} = require('webpack-merge')
const srcPath = path.join(__dirname, 'src')
const distPath = path.join(__dirname, 'dist')
const webpack = require('webpack')


module.exports = merge(webpackCommonConf, {
  mode: 'production',
  output: {
    filename: 'bundle.js', 
    path: distPath,
  },
  plugins: [
    new webpack.DefinePlugin({
      ENV: JSON.stringify('production')
    })
  ]

})

