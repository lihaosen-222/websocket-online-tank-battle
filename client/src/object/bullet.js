const GameObj = require('./GameObj')
const MyGameObj = require('./MyGameObj')

function createBulletDOM(className) {
  const DOM = document.createElement('li')
  DOM.className = `bullet ${className}`
  return DOM
}

class MyBullet extends MyGameObj {
  constructor(config) {
    super(config)
    this.DOM = createBulletDOM('myBullet')
  }
}

class OtherBullet extends GameObj {
  constructor(config) {
    super(config)
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

module.exports = newBullet
