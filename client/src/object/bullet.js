import GameObj from './GameObj'
import MyGameObj from './MyGameObj'
import globalConfig from '../config'


function createBulletDOM(className) {
  const DOM = document.createElement('li')
  DOM.className = `bullet ${className}`
  return DOM
}

class MyBullet extends MyGameObj {
  constructor(config={}) {
    super(config)
    this.fatherDOM = document.querySelector('.bullet-obj')
    this.xLength = 4
    this.yLength = 4
    this.speed = globalConfig.bulletSpeed
    this.DOM = createBulletDOM('myBullet')
  }
}

class OtherBullet extends GameObj {
  constructor(config={}) {
    super(config)
    this.fatherDOM = document.querySelector('.bullet-obj')
    this.xLength = 4
    this.yLength = 4
    this.DOM = createBulletDOM('OtherBullet')
  }
}

function newBullet(type, config) {
  switch (type) {
    case 'other': {
      return new OtherBullet(config)
    }
    case 'my': {
      return new MyBullet(config)
    }
  }
}
export default newBullet
