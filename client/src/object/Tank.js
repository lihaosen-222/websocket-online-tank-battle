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
    const bullet = {}
    return { tank, bullet }
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
    this.DOM = createTanktDOM('OtherTank')
    this.xLength = 20
    this.yLength = 20
    this.barrelDOM = this.DOM.querySelector('.barrel')
    this.bullets = []
  }

  renderBarrel() {
    const angle360 = (this.direction / Math.PI / 2) * 360
    this.barrelDOM.style.transform = `rotate(${angle360}deg)`
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
