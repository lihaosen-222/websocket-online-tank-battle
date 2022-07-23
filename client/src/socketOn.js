import { getDeadIds } from './utils'
import newTank from './object/Tank'

export default function socketOn(config) {
  let isDead = false
  const { otherTanks, coreTimer, socket, myTank } = config
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
}