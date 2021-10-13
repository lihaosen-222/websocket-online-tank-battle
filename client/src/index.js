import './css/index.css'
import { keyboard } from './object/keyboard'
import { Player, thisPlayer } from './object/player'
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
  thisPlayer.action()  // 当前客户端的操作
  socket.emit('single-player', thisPlayer.send())
  Player.otherMove()
  Bullet.send()
  Bullet.move()
  if (thisPlayer.isShot) clearInterval(coreTimer)
}, 20)

