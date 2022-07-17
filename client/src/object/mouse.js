const { mouse } = require('../../src copy/object/mouse')

class Mouse {
  constructor(name) {
    this.x = 0
    this.y = 0
    this.isDown = false
    this.gameDom = document.querySelector(name)

    document.addEventListener('mousemove', (e) => {
      this.x = e.pageX - gameDom.offsetLeft
      this.y = e.pageY - gameDom.offsetTop
    })

    document.addEventListener('mousedown', function (e) {
      if (e.button === 0) this.isDown = true
    })

    document.addEventListener('mouseup', function (e) {
      if (e.button === 0) this.isDown = false
    })
  }

  getRelativePosition() {
    const { x, y } = this
    return { x, y }
  }

  getIsDown() {
    return this.isDown
  }

  getObjToMouseAngle(xPos, yPos) {
    const angle = Math.atan(this.y - yPos / this.x - xPos)
    return angle > 0 ? angle : angle + Math.PI
  }
}

module.exports = Mouse
