import './css/index.css'
import { checkMobile } from './utils'
import startTimer from './coreTimer'
import { io } from 'socket.io-client'
import newTank from './object/Tank'
import GameMap from './object/GameMap'

if (checkMobile()) {
  const scale = (document.body.clientWidth - 50) / 600
  document
    .querySelector('meta[name=viewport]')
    .setAttribute(
      'content',
      `width=device-width, initial-scale=${scale},, user-scalable=0`
    )
}

const socket = io()
const otherTanks = {}
const gameMap = new GameMap(600, 600)
const myTank = newTank('my', { ...gameMap.getRandomPosition() }).create() 
let isDead = false

const coreTimer = startTimer({ socket, otherTanks, gameMap, myTank })

socket.on('gameState', (gameState) => {
  delete gameState[socket.id]
  const deadIds = Object.keys(otherTanks)
  const liveIds = Object.keys(gameState)
  liveIds.forEach((id) => {
    if (deadIds.includes(id)) deadIds.splice(deadIds.indexOf(id), 1)
  })

  deadIds.forEach((id) => {
    otherTanks[id].destroyAll()
    delete otherTanks[id]
  })

  liveIds.forEach((id) => {
    const state = gameState[id]
    const tank = otherTanks[id]
    if (tank) {
      // 渲染现有 tank
      tank.updateAndRenderAll(state)
    } else {
      // 新增 tank
      const tank = newTank('other')
      tank.create().updateAndRenderAll(state)
      otherTanks[id] = tank
    }
  })
})

socket.on('dead', (id) => {
  if (id === socket.id && !isDead) {
    isDead = true
    clearInterval(coreTimer)
    document.querySelector('.modal').style.display = 'block'
    myTank.destroyAll()
  }
})

// 取右键菜单操作
document.addEventListener('contextmenu', function (e) {
  e.preventDefault()
})

// 取消文字选中
document.addEventListener('selectstart', function (e) {
  e.preventDefault()
})
