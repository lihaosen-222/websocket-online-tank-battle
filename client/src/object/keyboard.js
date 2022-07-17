class Keyboard {
  constructor() {
    this.isDown = false

    document.addEventListener('keyup', function (e) {
      if (e.key === 'Space') this.isDown = false
    })

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Space') this.isDown = false
    })
  }

  getIsDown() {
    return this.isDown
  }
}

module.exports = Keyboard
