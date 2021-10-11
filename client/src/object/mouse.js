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
  }
}

export { mouse }