import './css/index.css'
import GameMap from './object/GameMap'
import KeyBoard from './object/Keyboard'
import Mouse from './object/Mouse'
import newTank from './object/Tank'

// 取右键菜单操作
document.addEventListener('contextmenu', function (e) {
  e.preventDefault()
})
// 取消文字选中
document.addEventListener('selectstart', function (e) {
  e.preventDefault()
})

const keyBoard = new KeyBoard()
const mouse = new Mouse('.shell')
const gameMap = new GameMap(600, 600)

const myTank = newTank('my', {
  fatherDOM: document.querySelector('.tank-obj'),
  ...gameMap.getRandomPosition(),
})
myTank.create()

const coreTimer = setInterval(function () {
  const { xPos, yPos } = myTank.getPostion()
  myTank.updateDirection(mouse.getObjToMouseAngle(xPos, yPos))
  myTank.renderBarrel()

  if (mouse.getIsDown()) {
    myTank.fire()
  }

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

  if (keyBoard.getIsDown()) {
    let { xPos: xTo, yPos: yTo } = myTank.getNextPostion()
    xTo = gameMap.isXCollided(xTo) ? xPos : xTo
    yTo = gameMap.isYCollided(yTo) ? yPos : yTo
    myTank.updatePosition(xTo, yTo)
    myTank.render()
  }
}, 20)
