import './css/index.css'
import startTimer from './coreTimer'
import { io } from 'socket.io-client'
import newTank from './object/Tank'

var socket = io('http://localhost:3007')

// 取右键菜单操作
document.addEventListener('contextmenu', function (e) {
  e.preventDefault()
})
// 取消文字选中
document.addEventListener('selectstart', function (e) {
  e.preventDefault()
})

const otherTank = {}

socket.on('gameState', (gameState) => {
  delete gameState[socket.id]
  // 可以写个函数，得到死亡 id
  const tankIds = Object.keys(otherTank)
  for (const k in gameState) {
    if (tankIds.includes(k)) tankIds.splice(tankIds.indexOf(k), 1)
  }
  tankIds.forEach((id) => {
    otherTank[id].destroy() // 销毁死亡的 tank
    delete otherTank[id]
  })

  for (const k in gameState) {
    const { tank, bullets } = gameState[k]
    // if (!tank) return // 刚开始可能传空对象
    const { xPos, yPos, direction } = tank

    if (otherTank[k]) {
      const tank = otherTank[k]

      tank.updatePosition(xPos, yPos)
      tank.updateDirection(direction)
      tank.renderBarrel()
      tank.render()
      tank.updateBullets(bullets)
      tank.renderBullets()
    }
    // 新增 tank
    else {
      const tank = newTank('other', {
        fatherDOM: document.querySelector('.tank-obj'),
        xPos,
        yPos,
        direction,
      })
      tank.create()
      tank.renderBarrel()
      tank.render()
      otherTank[k] = tank
    }
  }

})

const coreTimer = startTimer(socket, otherTank)

socket.on('dead', (id) => {
  if (id === socket.id) {
    alert('dead')
    clearInterval(coreTimer)
  }
})
