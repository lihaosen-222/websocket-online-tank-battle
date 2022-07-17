import GameObj from './GameObj'
import MyGameObj from './MyGameObj'
import newBullet from './Bullet'
import { getThrottleFn } from '../utils'
import GameMap from './GameMap'

function createTanktDOM(className) {
  const DOM = document.createElement('li')
  const barrelDOM = document.createElement('div')
  DOM.className = `tank ${className}`
  barrelDOM.className = 'barrel'
  DOM.appendChild(barrelDOM)
  return DOM
}

class MyTank extends MyGameObj {
  constructor(config) {
    super(config)
    this.DOM = createTanktDOM('myTank')
    this.xLength = 20
    this.yLength = 20
    this.speed = 4
    this.barrelDOM = this.DOM.querySelector('.barrel')
    this.bullets = []
    this.fire = getThrottleFn(this.fire, 500) // 给 fire 节流
  }

  renderBarrel() {
    const angle360 = (this.direction / Math.PI / 2) * 360
    this.barrelDOM.style.transform = `rotate(${angle360}deg)`
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
    const bullet = newBullet('my', {
      fatherDOM: document.querySelector('.bullet-obj'),
      xPos,
      yPos,
    })
    bullet.updateDirection(direction)
    bullet.create()
    this.bullets.push(bullet)
  }
}

class OtherTank extends GameObj {
  constructor(config) {
    super(config)
    this.DOM = createTanktDOM('otherTank')
    this.xLength = 20
    this.yLength = 20
    this.barrelDOM = this.DOM.querySelector('.barrel')
    this.bullets = []
    this.direction = config.direction
  }
  updateDirection(direction) {
    this.direction = direction
  }
  renderBarrel() {
    const angle360 = (this.direction / Math.PI / 2) * 360
    this.barrelDOM.style.transform = `rotate(${angle360}deg)`
  }

  // 根据 state 更新 bullets
  updateBullets(bulletsState) {
    const stateLength = bulletsState.length
    // const max = Math.max(bulletsState.length, this.bullets.length)
    // console.log(bulletsState)
    for (let i = 0; i < bulletsState.length; i++) {
      const { xPos, yPos } = bulletsState[i]
      if (this.bullets[i]) {
        this.bullets[i].updatePosition(xPos, yPos)
      } else {
        this.bullets[i] = newBullet('other', {
          fatherDOM: document.querySelector('.bullet-obj'),
          xPos,
          yPos,
        })
        this.bullets[i].create()
      }
    }

    this.bullets.splice(bulletsState.length).forEach(bullet => {
      console.log('desty')
      bullet.destroy()
    })

  }

  renderBullets() {
    this.bullets.forEach((bullet) => {
      bullet.render()
    })
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
