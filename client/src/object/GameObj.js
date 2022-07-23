class GameObj {
  constructor(config={}) {
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
    this.updatePosition(xPos, yPos).render()
    this.fatherDOM.appendChild(this.DOM)
    return this
  }

  updatePosition(xPos, yPos) {
    this.xPos = xPos
    this.yPos = yPos
    return this
  }

  getPostion() {
    const { xPos, yPos } = this
    return { xPos, yPos }
  }

  // 根据自身维护的数据渲染
  render() {
    const { xPos, yPos, xLength, yLength, DOM } = this
    DOM.style.left = xPos - xLength / 2 + 'px'
    DOM.style.top = yPos - yLength / 2 + 'px'
    return this
  }

  destroy() {
    this.fatherDOM.removeChild(this.DOM)
    return this
  }

  static isCollided(obj1, obj2) {
    const isXOverLap =
      Math.abs(obj1.xPos - obj2.xPos) < obj1.xLength / 2 + obj2.xLength / 2
    const isYOverLap =
      Math.abs(obj1.yPos - obj2.yPos) < obj1.yLength / 2 + obj2.yLength / 2
    return isXOverLap && isYOverLap
  }
}

export default GameObj
