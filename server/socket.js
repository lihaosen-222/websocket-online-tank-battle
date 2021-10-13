const express = require("express");
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require("socket.io")(server, { cors: true }) //scocket.io允许跨域

const playerArr = ['client'] // 零号留给当前客户端


io.on('connection', socket => {
  let name = -1 
  // 遍历找到没被占用的序号，然后注册
  for (let i = 1; i <= playerArr.length; i++) {
    if (!playerArr[i]) {
      name = i
      playerArr[i] = { name }  // 不为空代表有人了
      io.emit('sign-in', name) 
      break
    }
  }
  console.log(name, '建立连接！');
  
  // 断开连接时清除数据,发送断开的序号
  socket.on("disconnect", reason => {
    playerArr[name] = undefined
    for (let i = playerArr.length - 1; i > 0; i--) {
      if (!playerArr[i]) playerArr.splice(i, 1);
      else break
    }
    
    console.log(playerArr);
    io.emit('sign-out', name)
    console.log(name, '断开连接！');
  });

  socket.on('sigle-player', data => {
    playerArr[name] = data
  });

  socket.on('bullet', data => {
    io.emit('bullet', data)
  })

})

const coreTimer = setInterval(function () {
  io.emit('all-player', playerArr)
}, 20)


module.exports = { server, app, express }