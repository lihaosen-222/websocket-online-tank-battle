import GameObj from './GameObj'

class MyGameObj extends GameObj {
  constructor(config={}) {
    super(config)
    const { speed, direction } = config
    this.speed = speed
    this.direction = direction
  }

  updateDirection(direction) {
    this.direction = direction
    return this
  }

  // tank 先 set 后计算，子弹 direction 恒定
  getNextPostion() {
    const { xPos: oldX, yPos: oldY, direction, speed } = this
    let xPos = oldX + speed * Math.cos(direction)
    let yPos = oldY + speed * Math.sin(direction)
    return { xPos, yPos }
  }
}

export default MyGameObj
