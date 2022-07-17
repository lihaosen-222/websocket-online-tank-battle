class GameMap {
  constructor(xLength, yLength) {
    this.xLength = xLength
    this.yLength = yLength
  }

  isXCollided(xPos) {
    return xPos < 0 || xPos > this.xLength
  }

  isYCollided(yPos) {
    return yPos < 0 || yPos > this.yLength
  }

  isCollided(xPos, yPos) {
    return this.isXCollided(xPos) || this.isYCollided(yPos)
  }

  getRandomPosition() {
    const xPos = Math.random() * 600
    const yPos = Math.random() * 600
    return { xPos, yPos }
  }
}

export default GameMap
