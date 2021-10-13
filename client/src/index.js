import './css/index.css'
import { keyboard } from './object/keyboard'
import { Player, player } from './object/player'
import { socket, socketInit } from './socket'
import { mouse } from './object/mouse'
import { Bullet } from './object/bullet'


// 取右键菜单操作
document.addEventListener('contextmenu', function (e) {
  e.preventDefault();
})
// 取消文字选中
document.addEventListener('selectstart', function (e) {
  e.preventDefault();
})

keyboard.init()
mouse.init()
Bullet.createRegister()
socketInit()

const coreTimer = setInterval(function () {
  player[0].action()  // 当前客户端的操作
  socket.emit('sigle-player', player[0].send())
  Player.otherMove()
  Bullet.send()
  Bullet.move()
}, 20)

