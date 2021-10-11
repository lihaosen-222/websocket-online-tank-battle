const path = require('path')
const srcPath = path.join(__dirname, 'src')
const distPath = path.join(__dirname, 'dist')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: path.join(srcPath, 'index'),
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(srcPath, 'index.html'),
      filename: 'index.html'
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' }
        ]
      }
    ]

  }
}





