const key = {
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
      for (const k in key) {
        if (key[k].code === e.keyCode) {
          key[k].isDown = true
          break
        }
      }
    })
    // 注册按下事件
    document.addEventListener('keyup', function (e) {
      for (const k in key) {
        if (key[k].code === e.keyCode) {
          key[k].isDown = false
          break
        }
      }
    })
  }
}


export { key }