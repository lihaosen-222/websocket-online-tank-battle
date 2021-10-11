const express = require("express");
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require("socket.io")(server, { cors: true }) //scocket.io允许跨域

io.on('connection', socket => {
  console.log('建立连接！');
  socket.on('send', data => {
    console.log('收到消息：', data);
    io.emit('all', data)
  });
})


module.exports = { server, app, express }