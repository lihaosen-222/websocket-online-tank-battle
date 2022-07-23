import GameObj from './GameObj'
import MyGameObj from './MyGameObj'
import newBullet from './Bullet'
import globalConfig from '../config'
import { getThrottleFn } from '../utils'

function createTanktDOM(className) {
  const DOM = document.createElement('li')
  const barrelDOM = document.createElement('div')
  DOM.className = `tank ${className}`
  barrelDOM.className = 'barrel'
  DOM.appendChild(barrelDOM)
  return DOM
}

class MyTank extends MyGameObj {
  constructor(config = {}) {
    super(config)
    const { tankSpeed, fireBreak } = globalConfig
    this.fatherDOM = document.querySelector('.tank-obj')
    this.DOM = createTanktDOM('myTank')
    this.xLength = 20
    this.yLength = 20
    this.speed = tankSpeed
    this.barrelDOM = this.DOM.querySelector('.barrel')
    this.bullets = []
    this.fire = getThrottleFn(this.fire, fireBreak) // 给 fire 节流
  }

  renderBarrel() {
    const angle360 = (this.direction / Math.PI / 2) * 360
    this.barrelDOM.style.transform = `rotate(${angle360}deg)`
    return this
  }

  getState() {
    const { xPos, yPos, direction } = this
    const tank = { xPos, yPos, direction }
    const bullets = this.bullets.map((bullet) => ({
      xPos: bullet.xPos,
      yPos: bullet.yPos,
    }))
    return { tank, bullets }
  }

  fire() {
    const { xPos, yPos, direction } = this
    const bullet = newBullet('my', { xPos, yPos })
    bullet.updateDirection(direction)
    bullet.create()
    this.bullets.push(bullet)
    return this
  }

  // 判断击中
  onHit(tanks, callBack) {
    this.bullets.forEach((bullet) => {
      for (const id in tanks) {
        if (GameObj.isCollided(tanks[id], bullet)) {
          callBack(id)
        }
      }
    })
    return this
  }

  // 需要 map 实例判断是否撞墙
  updateAndRenderBullets(gameMap) {
    this.bullets = this.bullets.filter((bullet) => {
      const { xPos, yPos } = bullet.getNextPostion()
      if (gameMap.isCollided(xPos, yPos)) {
        bullet.destroy()
        return false
      }
      bullet.updatePosition(xPos, yPos)
      bullet.render()
      return true
    })
    return this
  }

  destroyAll() {
    this.destroy()
    this.bullets.forEach((bullet) => {
      bullet.destroy()
    })
    return this
  }
}

class OtherTank extends GameObj {
  constructor(config = {}) {
    super(config)
    this.fatherDOM = document.querySelector('.tank-obj')
    this.DOM = createTanktDOM('otherTank')
    this.xLength = 20
    this.yLength = 20
    this.barrelDOM = this.DOM.querySelector('.barrel')
    this.bullets = []
    this.direction = config.direction
  }

  updateDirection(direction) {
    this.direction = direction
    return this
  }
  renderBarrel() {
    const angle360 = (this.direction / Math.PI / 2) * 360
    this.barrelDOM.style.transform = `rotate(${angle360}deg)`
    return this
  }

  updateBullets(bulletsState) {
    for (let i = 0; i < bulletsState.length; i++) {
      const { xPos, yPos } = bulletsState[i]
      if (this.bullets[i]) {
        this.bullets[i].updatePosition(xPos, yPos)
      } else {
        this.bullets[i] = newBullet('other', {
          xPos,
          yPos,
        })
        this.bullets[i].create()
      }
    }

    this.bullets.splice(bulletsState.length).forEach((bullet) => {
      bullet.destroy()
    })
    return this
  }

  renderBullets() {
    this.bullets.forEach((bullet) => {
      bullet.render()
    })
    return this
  }

  updateAndRenderAll(state) {
    const { tank, bullets } = state
    const { xPos, yPos, direction } = tank
    this.updatePosition(xPos, yPos)
    this.updateDirection(direction)
    this.updateBullets(bullets)
    this.renderBarrel()
    this.render()
    this.renderBullets()
    return this
  }

  destroyAll() {
    this.destroy()
    this.bullets.forEach((bullet) => {
      bullet.destroy()
    })
    return this
  }
}

function newTank(type, config) {
  switch (type) {
    case 'other': {
      return new OtherTank(config)
    }
    case 'my': {
      return new MyTank(config)
    }
    default: {
      throw 'type error'
    }
  }
}

export default newTank
