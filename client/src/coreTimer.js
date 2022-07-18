import GameMap from './object/GameMap'
import KeyBoard from './object/Keyboard'
import Mouse from './object/Mouse'
import newTank from './object/Tank'

export default function startTimer(socket, otherTanks) {
  const keyBoard = new KeyBoard()
  const mouse = new Mouse('.shell')
  const gameMap = new GameMap(600, 600)

  const myTank = newTank('my', { ...gameMap.getRandomPosition() })
  myTank.create()

  return setInterval(function () {
    const { xPos, yPos } = myTank.getPostion()
    if (mouse.getIsDown()) myTank.fire()

    if (keyBoard.getIsDown()) {
      let { xPos: xTo, yPos: yTo } = myTank.getNextPostion()
      xTo = gameMap.isXCollided(xTo) ? xPos : xTo
      yTo = gameMap.isYCollided(yTo) ? yPos : yTo
      myTank.updatePosition(xTo, yTo)
      myTank.render()
    }

    myTank.updateDirection(mouse.getObjToMouseAngle(xPos, yPos))
    myTank.renderBarrel()

    myTank.updateAndRenderBullets(gameMap)
    myTank.isHit(otherTanks, (id) => {
      socket.emit('kill', id)
    })

    socket.emit('singleState', myTank.getState())
  }, 20)
}
