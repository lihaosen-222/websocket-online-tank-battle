class Keyboard {
  constructor() {
    this.isDown = false

    document.addEventListener('keyup', (e) => {
      if (e.code === 'Space') this.isDown = false
    })

    document.addEventListener('keydown', (e) => {
      if (e.code === 'Space') this.isDown = true
    })
  }

  getIsDown() {
    return this.isDown
  }
}
export default Keyboard
