const express = require("express");
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require("socket.io")(server, { cors: true }) //scocket.io允许跨域

const playerArr = [] 
let shotedArr = []

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
  

  // 断开连接时清除数据（被击中后的玩家数据不会再次删除）,发送断开的序号
  socket.on("disconnect", reason => {
    let isShoted = false
    
    shotedArr.some(item => {
      if(item === name) {
        isShoted = true
        return true
      }
    })
    if (!isShoted) {  // 没有被击中才会删除
      for (let i = 0; i < playerArr.length; i++) {
        if (playerArr[i].name === name) {
          playerArr.splice(i, 1)
          break
        }
      }
      console.log('emit');
      io.emit('sign-out', name)
      console.log(name, '没被击中断开连接');
      playerArr.forEach(item => console.log(item.name))
    }
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

  // 有玩家被击中，添加子弹数组
  socket.on('shot-down', nameShoted => {
    io.emit('shot-down', nameShoted)
    for (let i = 0; i < playerArr.length; i++) {
      if (playerArr[i].name === nameShoted) {
        playerArr.splice(i, 1)
        shotedArr[shotedArr.length] = nameShoted
        break
      }
    }
    console.log(nameShoted, '被击中后断开连接');

    playerArr.forEach(item => console.log(item.name))

  });

  // 转发子弹数据
  socket.on('bullet', data => {
    io.emit('bullet', data)
  })
})

const coreTimer = setInterval(function () {
  io.emit('all-player', playerArr)
}, 20)


module.exports = { server, app, express }