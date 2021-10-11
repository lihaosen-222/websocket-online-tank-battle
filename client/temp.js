const path = require('path');
// 通过module.exports导出一个配置对象，还可以导出为一个函数或者是Promise 有兴趣可以自己去了解
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  }
};


