import './css/index.css'
import { keyboard } from './object/keyboard'
import { player } from './object/player'
import { socket } from './socket'
import { mouse } from './object/mouse'


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

const coreTimer = setInterval(function () {
  // 当前客户端的操作
  player[0].action()
  socket.emit('send', player[0].send())

  // 遍历player，改变玩家位姿
  for (let i = 1; i < player.length; i++) {
    // 排除当前客户端，且要求该player数据存在
    if (player[0].name !== i && player[i]) {
      player[i].otherMove()
    }
  }
}, 20)

