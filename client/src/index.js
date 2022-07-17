import './css/index.css'
import KeyBoard from './object/Keyboard'
import Mouse from './object/Mouse'

// 取右键菜单操作
document.addEventListener('contextmenu', function (e) {
  e.preventDefault()
})
// 取消文字选中
document.addEventListener('selectstart', function (e) {
  e.preventDefault()
})

const keyBoard = new KeyBoard()
const mouse = new Mouse('.shell')

const coreTimer = setInterval(function () {
  if (mouse.getIsDown()) {
    console.log(mouse.getObjToMouseAngle(300,300))
  }
  if (keyBoard.getIsDown()) console.log('keyBoard down')
}, 20)
