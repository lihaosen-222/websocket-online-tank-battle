import { mouseKey } from './mouse'
import { socket } from '.././socket'
import { player, thisPlayer } from './player'
import { keyboard } from './keyboard'

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

let bullet = []

// 计算出diff，封装成对象发送
Bullet.send = function() {
  if ((mouseKey.left.isDown || keyboard.s.isDown) && thisPlayer.isShotAvailable) {
    thisPlayer.isShotAvailable = false
    const shotTimer = setTimeout(() => {
      thisPlayer.isShotAvailable = true
      clearTimeout(shotTimer)
    }, 300)

    const xDiff = Bullet.speed * Math.cos(thisPlayer.angle) // 移动直径2px
    const yDiff = Bullet.speed * Math.sin(thisPlayer.angle)

    socket.emit('bullet', {
      name: thisPlayer.name,
      xInit: thisPlayer.x,
      yInit: thisPlayer.y,
      xDiff,
      yDiff
    })

  }
}

// 监听，若有请求则new子弹对象
Bullet.createRegister = function() {
  socket.on('bullet', data => {
    const li = document.createElement('li')
    li.className = 'bullet'
    objectDOM.appendChild(li)
    bullet[bullet.length] = new Bullet(data.name, data.xInit, data.yInit, data.xDiff, data.yDiff, li)
  })
}

const objectDOM = document.querySelector('.object')

// 遍历子弹对象，有长度控制和碰墙检测
Bullet.move = function() {
  bullet = bullet.filter(itemBullet => {
    let xTo = itemBullet.x + itemBullet.xDiff
    let yTo = itemBullet.y + itemBullet.yDiff
    let isTouchPlayer = false

    player.some(itemPlayer => {
      if (itemPlayer.name !== itemBullet.name) { 
        // 该玩家不为当前子弹发送者(注意不是thisPlayer！！！！！)，需判断碰撞
        if (
          Math.abs(itemPlayer.x - itemBullet.x) < itemPlayer.xLength / 2 + Bullet.xLength / 2
          &&
          Math.abs(itemPlayer.y - itemBullet.y) < itemPlayer.yLength / 2 + Bullet.yLength / 2
        ) {
          isTouchPlayer = true
          if (itemBullet.name === thisPlayer.name) socket.emit('shot-down', itemPlayer.name)
          return true
        }
      }
    })

    // 碰墙检测 击中检测
    if (xTo < 0 || xTo > 600 || yTo < 0 || yTo > 600 || isTouchPlayer) {
      objectDOM.removeChild(itemBullet.dom)
      return false  // 直接排除该数据
    } else {
      // 正常移动
      itemBullet.x = xTo
      itemBullet.y = yTo

      itemBullet.dom.style.left = xTo - Bullet.xLength / 2 + 'px'   // 根据边长换算出left和top
      itemBullet.dom.style.top = yTo - Bullet.yLength / 2 + 'px'

      return true
    }
  })
}

export { Bullet, bullet }