import './css/index.css'
import { checkMobile, preventDefaultEvent } from './utils'
import startTimer from './coreTimer'
import socketOn from './socketOn'
import { io } from 'socket.io-client'
import newTank from './object/Tank'
import GameMap from './object/GameMap'

if (checkMobile()) {
  const scale = (document.body.clientWidth - 50) / 600
  document
    .querySelector('meta[name=viewport]')
    .setAttribute(
      'content',
      `width=device-width, initial-scale=${scale},  user-scalable=0`
    )
}

// 取消右键菜单操作和文字选中的默认事件
preventDefaultEvent('contextmenu', 'selectstart')

const socket = io()
const otherTanks = {}
const gameMap = new GameMap(600, 600)
const myTank = newTank('my', { ...gameMap.getRandomPosition() }).create()

const coreTimer = startTimer({ socket, myTank, otherTanks, gameMap })
socketOn({ socket, coreTimer, myTank, otherTanks })

// 测延迟
const latencyDOM = document.querySelector('.latency')
setInterval(() => {
  const lastTime = Date.now()
  socket.emit('latency', undefined, () => {
    latencyDOM.innerHTML = Date.now() - lastTime + 'ms'
  })
}, 500)
