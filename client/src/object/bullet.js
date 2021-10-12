import { mouseKey } from './mouse'
import { socket } from '.././socket'
import { player } from './player'

function Bullet(name, xInit, yInit, xDiff, yDiff, dom) {
  this.name = name
  this.x = xInit
  this.y = yInit
  this.xDiff = xDiff
  this.yDiff = yDiff
  this.dom = dom
}

Bullet.xLength = 4
Bullet.yLength = 4
Bullet.speed = 10
Bullet.prototype.speed = 10

const bullet = []

// 计算出diff，封装成对象发送
Bullet.send = function() {
  if (mouseKey.left.isDown) {
    mouseKey.left.isDown = false

    const xDiff = Bullet.speed * Math.cos(player[0].angle) // 移动直径2px
    const yDiff = Bullet.speed * Math.sin(player[0].angle)

    socket.emit('bullet', {
      name: player[0].name,
      xInit: player[0].x,
      yInit: player[0].y,
      xDiff,
      yDiff,
    })

  }
}

// 监听，若有请求则new子弹对象
Bullet.createRegister = function() {
  socket.on('bullet', data => {
    // console.log(player);
    const li = document.createElement('li')
    li.className = 'bullet'
    objectDOM.appendChild(li)

    // 若检测到空这创建
    for (let i = 0; i <= bullet.length; i++) {
      if (!bullet[i]) {
        bullet[i] = new Bullet(data.name, data.xInit, data.yInit, data.xDiff, data.yDiff, li)
        // console.log(new Bullet(data.name, data.xInit, data.yInit, data.xDiff, data.yDiff, li));
        break
      }
    }


  })
}

const objectDOM = document.querySelector('.object')

// 遍历子弹对象，有长度控制和碰墙检测
Bullet.move = function() {
  for (let i = 0; i < bullet.length; i++) {
    if (bullet[i]) {
      let xTo = bullet[i].x + bullet[i].xDiff
      let yTo = bullet[i].y + bullet[i].yDiff

      let isTouchPlayer = false

      for (let j = 0; j < player.length; j++) {

        if (player[j]) { //数据不为空
          // console.log(player[j].name, bullet[i].name, player[j].name !== bullet[i].name);
          
          if (player[j].name !== bullet[i].name) { // 该玩家不为当前子弹发送者，需判断碰撞
            if (
              Math.abs(player[j].x - bullet[i].x) < player[j].xLength / 2 + Bullet.xLength / 2
              &&
              Math.abs(player[j].y - bullet[i].y) < player[j].yLength / 2 + Bullet.yLength / 2
            ) {
              // console.log('for');
              // console.log('touch');
              isTouchPlayer = true
              break
            }
          }
        }

      }

      // 碰墙检测 击中检测
      if (xTo < 0 || xTo > 600 || yTo < 0 || yTo > 600 || isTouchPlayer) {
        objectDOM.removeChild(bullet[i].dom)
        bullet[i] = undefined

        // 动态删除后面的undefined
        for (let i = bullet.length - 1; i >= 0; i--) {
          if (!bullet[i]) bullet.splice(i, 1);
          else break
        }
      } else {
        // 正常移动
        bullet[i].x = xTo
        bullet[i].y = yTo

        bullet[i].dom.style.left = xTo - Bullet.xLength / 2 + 'px'   // 根据边长换算出left和top
        bullet[i].dom.style.top = yTo - Bullet.yLength / 2 + 'px'
      }

    }
  }
}

export { Bullet, bullet }