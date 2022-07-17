import GameMap from './object/GameMap'
import KeyBoard from './object/Keyboard'
import Mouse from './object/Mouse'
import newTank from './object/Tank'

export default function startTimer(socket) {
  const keyBoard = new KeyBoard()
  const mouse = new Mouse('.shell')
  const gameMap = new GameMap(600, 600)

  const myTank = newTank('my', {
    fatherDOM: document.querySelector('.tank-obj'),
    ...gameMap.getRandomPosition(),
  })
  myTank.create()

  return  setInterval(function () {
    const { xPos, yPos } = myTank.getPostion()
    if (mouse.getIsDown()) {
      myTank.fire()
    }

    if (keyBoard.getIsDown()) {
      let { xPos: xTo, yPos: yTo } = myTank.getNextPostion()
      xTo = gameMap.isXCollided(xTo) ? xPos : xTo
      yTo = gameMap.isYCollided(yTo) ? yPos : yTo
      myTank.updatePosition(xTo, yTo)
      myTank.render()
    }

    myTank.updateDirection(mouse.getObjToMouseAngle(xPos, yPos))
    myTank.renderBarrel()

    myTank.bullets = myTank.bullets.filter((bullet) => {
      const { xPos, yPos } = bullet.getNextPostion()
      if (gameMap.isCollided(xPos, yPos)) {
        bullet.destroy()
        return false
      }
      bullet.updatePosition(xPos, yPos)
      bullet.render()
      return true
    })
    // console.log(Object.keys(myTank.getState()) === 0)
    socket.emit('singleState', myTank.getState())
  }, 20)
}
