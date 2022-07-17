import GameObj from './GameObj'
import MyGameObj from './MyGameObj'

function createTanktDOM(className) {
  const DOM = document.createElement('li')
  const barrelDOM = document.createElement('div')
  DOM.className = `tank ${className}`
  barrelDOM.className = 'barrel'
  DOM.appendChild(barrelDOM)
  return DOM
}

// function render

class MyTank extends MyGameObj {
  constructor(config) {
    super(config)
    this.DOM = createBulletDOM('myBullet')
    this.barrelDOM = this.DOM.querySelector('.barrel')
    this.bullets = []
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
}

class OtherTank extends GameObj {
  constructor(config) {
    super(config)
    this.DOM = createBulletDOM('OtherBullet')
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
