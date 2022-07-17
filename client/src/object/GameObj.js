class GameObj {
  constructor(config) {
    // config 太长了
    const { fatherDOM, xPos, yPos, xLength, yLength, DOM } = config
    this.fatherDOM = fatherDOM // fatherDOM 应该标识该物体，方便添加样式
    this.xPos = xPos // 对象中心的相对位置
    this.yPos = yPos
    this.xLength = xLength
    this.yLength = yLength
    this.DOM = DOM // 要自己创建 DOM
  }

  create(xPos = this.xPos, yPos = this.yPos) {
    this.updatePosition(xPos, yPos)
    this.render()
    this.fatherDOM.appendChild(this.DOM)
  }

  updatePosition(xPos, yPos) {
    this.xPos = xPos
    this.yPos = yPos
  }

  getPostion() {
    const { xPos, yPos } = this
    return { xPos, yPos }
  }

  // 根据自身维护的数据渲染
  render() {
    const { xPos, yPos, xLength, yLength, DOM } = this
    DOM.style.left = xPos - xLength/2 + 'px'
    DOM.style.top = yPos - yLength/2 + 'px'
  }

  destroy() {
    this.fatherDOM.removeChild(this.DOM)
  }

  static isCollided(obj1, obj2) {
    const { isOverLap } = GameObj
    // console.log(isOverLap('x', obj1, obj2))
    return isOverLap('x', obj1, obj2) && isOverLap('y', obj1, obj2)
  }

  static isOverLap(direction, obj1, obj2) {
    const isX = direction === 'x' || 'X'
    const position = isX ? 'xPos' : 'yPos'
    const length = isX ? 'xLength' : 'yLength'
    return Math.abs(obj1[position] - obj2[position]) <
      obj1[length] / 2 + obj2[length] / 2
  }
}

export default GameObj
