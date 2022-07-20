class MobileTap {
  constructor(name, type) {
    this.x = 0
    this.y = 0
    this.isDown = false
    this.mapDom = document.querySelector(name)

    if (type === 'mobile') {
      document.addEventListener('touchmove', (e) => {
        const { pageX, pageY } = e.changedTouches[0]
        this.updatePosition(pageX, pageY)
      })

      document.addEventListener('touchstart', (e) => {
        this.isDown = true
        const { pageX, pageY } = e.changedTouches[0]
        this.updatePosition(pageX, pageY)
      })

      document.addEventListener('touchend', (e) => {
        this.isDown = false
        const { pageX, pageY } = e.changedTouches[0]
        this.updatePosition(pageX, pageY)
      })
    } else if(type === 'pc') {
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
  }

  updatePosition(pageX, pageY) {
    this.x = pageX - this.mapDom.offsetLeft
    this.y = pageY - this.mapDom.offsetTop
  }

  getRelativePosition() {
    const { x, y } = this
    return { x, y }
  }

  getIsDown() {
    return this.isDown
  }

  getObjToAngle(xPos, yPos) {
    const xDiff = this.x - xPos
    const yDiff = this.y - yPos
    const angle = Math.atan(yDiff / xDiff)
    return xDiff > 0 ? angle : angle + Math.PI
  }
}

export default MobileTap
