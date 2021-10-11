import './index.css'
// import { io } from 'socket.io-client'

// if(ENV === 'development') {
//   var socket = io('http://localhost:8001')
// }
// if(ENV === 'production') {
//   var socket = io('http://81.68.226.188:8001')
// }

// socket.on('all', (data) => {
//   // console.log(data);

// })

// 键盘设置
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

// 按键初始化
key.init()

// 鼠标设置
const mouse = {
  pageX: 0, // 相对页面
  pageY: 0,
  x: 0, // 相对shell盒子
  y: 0
}

document.addEventListener('mousemove', e => {
  mouse.pageX = e.pageX
  mouse.pageY = e.pageY
})

// 取右键菜单操作
document.addEventListener('contextmenu', function (e) {
  e.preventDefault();
})
// 取消文字选中
document.addEventListener('selectstart', function (e) {
  e.preventDefault();
})

function Player(name) {
  this.name = name
  this.angle = 0
  this.x = 300
  this.y = 300 
  this.dom = {}
}



const player = []

player[0] = new Player('1') 

player[0].speed = 2

player[0].dom = document.querySelector('.player')

player[0].setAngle = function() {
  mouse.x = mouse.pageX - shellDOM.offsetLeft
  mouse.y = mouse.pageY - shellDOM.offsetTop
  
  const xDiff = mouse.x - this.x
  const yDiff = mouse.y - this.y

  let angle = Math.atan(yDiff / xDiff)
  if (xDiff < 0) angle = angle + Math.PI // 换算角度
  this.angle = angle
  const angle360 = angle / Math.PI / 2 * 360
  // console.log(this.angle);
  dirDOM.style.transform = `rotate(${angle360}deg)`
} 

player[0].move = function () {
  const xDiff = this.speed * Math.cos(this.angle) // 移动直径2px
  const yDiff = this.speed * Math.sin(this.angle) 
  this.x = this.x + xDiff
  this.y = this.y + yDiff
  this.dom.style.left = this.x + 'px' 
  this.dom.style.top = this.y + 'px'
}

const shellDOM = document.querySelector('.shell')
const dirDOM = document.querySelector('.dir')

const coreTimer = setInterval(function () {
  player[0].setAngle()
  if(key.a.isDown) {
    player[0].speed = 10
    player[0].move()
    player[0].speed = 2

    // 对比上次冲刺的时间，没问题才能冲刺
  }
  else if (key.space.isDown) player[0].move()
  

}, 20)
 