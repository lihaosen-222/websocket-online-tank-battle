import './css/index.css'
import { checkMobile, getDeadIds, preventDefaultEvent } from './utils'
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

// 取消右键菜单操作和文字选中的默认事件
preventDefaultEvent('contextmenu', 'selectstart')

const socket = io()
const otherTanks = {}
const gameMap = new GameMap(600, 600)
const myTank = newTank('my', { ...gameMap.getRandomPosition() }).create()
let isDead = false

const coreTimer = startTimer({ socket, otherTanks, gameMap, myTank })

socket.on('gameState', (gameState) => {
  delete gameState[socket.id]
  const liveIds = Object.keys(gameState)
  const deadIds = getDeadIds(Object.keys(otherTanks), liveIds)

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
