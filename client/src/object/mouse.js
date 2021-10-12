const mouseKey = {
  left: {
    key: 1,
    isDown: false
  },
  right: {
    key: 3,
    isDown: false
  }
}

const mouse = {
  pageX: 0, // 相对页面
  pageY: 0,
  x: 0, // 相对shell盒子
  y: 0,
  init() {
    document.addEventListener('mousemove', e => {
      mouse.pageX = e.pageX
      mouse.pageY = e.pageY
    })

    document.addEventListener('mousedown', function (e) {
      for (let k in mouseKey) {
        if (mouseKey[k].key === e.which) mouseKey[k].isDown = true
        // console.log(mouseKey[k].isDown);
      }
    })

    document.addEventListener('mouseup', function (e) {
      for (let k in mouseKey) {
        if (mouseKey[k].key === e.which) mouseKey[k].isDown = false
        // console.log(mouseKey[k].isDown);
      }

    })
  }
}


export { mouse, mouseKey }