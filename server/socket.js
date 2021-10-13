const express = require("express");
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require("socket.io")(server, { cors: true }) //scocket.io允许跨域

const playerArr = [] 

// 返回一个没人占领的序号
function getName() {
  if (playerArr.length === 0) return 0 // 排除playerArr没有数据的情况
  for (let i = 0; true; i++) {
    const flag = playerArr.every(item => {
      if (item.name !== i) return true
    })
    if (flag) return i  // 遍历时无相同的就返回当前序号
  }
}

io.on('connection', socket => {
  let name = getName()
  playerArr[playerArr.length] = { name }
  io.emit('sign-in', name)

  console.log(name, '建立连接！');
  console.log('arr', playerArr);
  
  // 断开连接时清除数据,发送断开的序号
  socket.on("disconnect", reason => {
    for(let i = 0; i < playerArr.length; i++) {
      if(playerArr[i].name === name) {
        playerArr.splice(i, 1)
        break
      }
    }

    io.emit('sign-out', name)
    console.log(name, '断开连接！');
    console.log('arr', playerArr);

  });

  // 一个玩家的数据传输
  socket.on('single-player', data => {
    for (let i = 0; i < playerArr.length; i++) {
      if (playerArr[i].name === data.name) {
        playerArr[i] = data
        break
      }
    }
  });

  socket.on('bullet', data => {
    io.emit('bullet', data)
  })

})

const coreTimer = setInterval(function () {
  // console.log(playerArr);
  io.emit('all-player', playerArr)
}, 20)


module.exports = { server, app, express }