class Mouse {
  constructor(name) {
    this.x = 0
    this.y = 0
    this.isDown = false
    this.mapDom = document.querySelector(name)

    document.addEventListener('mousemove', (e) => {
      this.x = e.pageX - this.mapDom.offsetLeft
      this.y = e.pageY - this.mapDom.offsetTop
    })

    document.addEventListener('mousedown', (e) => {
      if (e.button === 0) this.isDown = true
    })

    document.addEventListener('mouseup', (e) => {
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
    const xDiff = this.x - xPos
    const yDiff = this.y - yPos
    const angle = Math.atan(yDiff / xDiff)
    return xDiff > 0 ? angle : angle + Math.PI
  }
}

export default Mouse
