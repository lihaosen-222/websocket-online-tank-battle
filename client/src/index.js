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

function getDeadTanks(otherTank, gameState) {
  const dead = Object.keys(otherTank)
  const undead = Object.keys(gameState)
}

socket.on('gameState', (gameState) => {
  delete gameState[socket.id]
  const deadIds = Object.keys(otherTank)
  const liveIds = Object.keys(gameState)
  liveIds.forEach((id) => {
    if (deadIds.includes(id)) deadIds.splice(deadIds.indexOf(id), 1)
  })

  deadIds.forEach((id) => {
    otherTank[id].destroyAll()
    delete otherTank[id]
  })

  liveIds.forEach((id) => {
    const state = gameState[id]
    const tank = otherTank[id]
    if (tank) {
      // 渲染现有 tank
      tank.updateAndRenderAll(state)
    } else {
      // 新增 tank
      const tank = newTank('other', {
        fatherDOM: document.querySelector('.tank-obj'),
      })
      tank.create()
      tank.updateAndRenderAll(state)
      otherTank[id] = tank
    }
  })
})

const coreTimer = startTimer(socket, otherTank)

socket.on('dead', (id) => {
  if (id === socket.id) {
    clearInterval(coreTimer)
    alert('dead')
  }
})
