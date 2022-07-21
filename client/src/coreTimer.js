import KeyBoard from './object/Keyboard'
import Tap from './object/Tap'
import { checkMobile } from './utils'


const isMobile = checkMobile()

export default function startTimer(config ) {
  const {socket, otherTanks, gameMap, myTank} = config

  const keyBoard = new KeyBoard()
  const tap = new Tap('.shell', isMobile ? 'mobile' : 'pc')

  return setInterval(function () {
    const { xPos, yPos } = myTank.getPostion()
    if (tap.getIsDown()) myTank.fire()

    if (keyBoard.getIsDown() || tap.getIsDown()) {
      let { xPos: xTo, yPos: yTo } = myTank.getNextPostion()
      xTo = gameMap.isXCollided(xTo) ? xPos : xTo
      yTo = gameMap.isYCollided(yTo) ? yPos : yTo
      myTank.updatePosition(xTo, yTo)
      myTank.render()
    }

    myTank.updateDirection(tap.getObjToAngle(xPos, yPos))
    myTank.renderBarrel()

    myTank.updateAndRenderBullets(gameMap)
    myTank.isHit(otherTanks, (id) => {
      socket.emit('kill', id)
    })

    socket.emit('singleState', myTank.getState())
  }, 20)
}
