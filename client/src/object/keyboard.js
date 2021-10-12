const keyboard = {
  a: {
    code: 65,
    isDown: false,
  },
  s: {
    code: 83,
    isDown: false,
  },
  d: {
    code: 68,
    isDown: false,
  },
  space: {
    code: 32,
    isDown: false
  },
  init() {
    // 注册弹起事件
    document.addEventListener('keydown', function (e) {
      for (const k in keyboard) {
        if (keyboard[k].code === e.keyCode) {
          keyboard[k].isDown = true
          break
        }
      }
    })
    // 注册按下事件
    document.addEventListener('keyup', function (e) {
      for (const k in keyboard) {
        if (keyboard[k].code === e.keyCode) {
          keyboard[k].isDown = false
          break
        }
      }
    })
  }
}


export { keyboard }