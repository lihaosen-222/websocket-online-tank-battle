class Map {
  constructor(xLength, yLength) {
    this.xLength = xLength
    this.yLength = yLength
  }

  isCollided(xPos,yPos) {
    const isXOut = xPos < 0 || xPos > xLength
    const isYOut = yPos < 0 || yPos > yLength
    return isXOut || isYOut
  }

  getRandomPosition() {
    const xPos = Math.random() * 600
    const yPos = Math.random() * 600
    return { xPos, yPos }
  }
}

module.exports = Map