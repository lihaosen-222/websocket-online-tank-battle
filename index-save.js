import './css/index.css'
import { io } from 'socket.io-client'

// 取右键菜单操作
document.addEventListener('contextmenu', function (e) {
  e.preventDefault();
})
// 取消文字选中
document.addEventListener('selectstart', function (e) {
  e.preventDefault();
})




if (ENV === 'development') {
  var socket = io('http://localhost:8001')
}
if (ENV === 'production') {
  var socket = io('http://81.68.226.188:8001')
}

// 登录信息，在这获得名字
socket.on('sign-in', data => {
  // 若还没创建，则自己占用名字
  if (!player[0].name) {
    player[0].name = data
    player[0].dom.children[0].innerHTML = data
  }

})

// 登出信息，在这删除DOM
socket.on('sign-out', data => {
  objectDOM.removeChild(player[data].dom)
  player[data] = undefined
  // 清楚多余的undefined
  for (let i = player.length - 1; i > 0; i--) {
    if (!player[i]) player.splice(i);
  }
  console.log(player);
})

// 群发信息，创建DOM，更新位姿
socket.on('all', (data) => {
  for (let i = 1; i < data.length; i++) {
    if (data[i] && player[0].name !== i) { 
      // data中数据存在，且不为当前客户端序号
      if (!player[i]) { // 处理没创建的
        player[i] = new Player()
        // DOM创建和赋值
        const li = document.createElement('li')
        li.className = 'player'
        const span = document.createElement('span')
        const dir = document.createElement('div')
        span.innerHTML = i
        dir.className = 'dir'
        li.appendChild(span)
        li.appendChild(dir)
        objectDOM.appendChild(li)
        player[i].dom = li
      }

      // 赋位姿信息
      player[i].x = data[i].x
      player[i].y = data[i].y
      player[i].angle = data[i].angle
    }


  }
})

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


function Player() {
  this.name = false  // 没名字时才会要求加载名字
  this.angle = 0
  this.x = 300
  this.y = 300 
  this.dom = {}
}

Player.prototype.otherMove = function() {
  this.dom.style.left = this.x + 'px'
  this.dom.style.top = this.y + 'px'
  const angle360 = this.angle / Math.PI / 2 * 360
  this.dom.children[1].style.transform = `rotate(${angle360}deg)`
}

const player = [] // 全部玩家的信息

// 当前客户的信息
player[0] = new Player() 
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
  player[0].dom.children[1].style.transform = `rotate(${angle360}deg)`
} 

player[0].move = function () {
  const xDiff = this.speed * Math.cos(this.angle) // 移动直径2px
  const yDiff = this.speed * Math.sin(this.angle) 
  let xTo = this.x + xDiff
  let yTo = this.y + yDiff

  // 如果要下次移动要超过边界，直接移动到边界位置
  if (xTo < 0 || xTo > 580) {
    if (xTo < 0) xTo = 0
    else xTo = 580
  }
  if(yTo < 0 || yTo > 580) {
    if (yTo < 0) yTo = 0
    else yTo = 580
  }

  this.x = xTo
  this.y = yTo
  this.dom.style.left = xTo + 'px'
  this.dom.style.top = yTo + 'px'
}

player[0].dash = function () {
  player[0].speed = 10
  player[0].move()
  player[0].speed = 2
}

// 发送关键数据给服务器
player[0].send = function () {
  // 封装发送信息
  const send = {
    name: player[0].name,
    x: player[0].x,
    y: player[0].y,
    angle: player[0].angle
  }
  socket.emit('send', send)
}

const shellDOM = document.querySelector('.shell')
const objectDOM = document.querySelector('.object')

const coreTimer = setInterval(function () {
  // 当前客户端的操作
  player[0].setAngle()
  if(key.a.isDown) player[0].dash()
  else if (key.space.isDown) player[0].move() 
  player[0].send()

  // 遍历player，改变玩家位姿
  for (let i = 1; i < player.length; i++) {
    // 排除当前客户端，且要求该player数据存在
    if (player[0].name !== i && player[i]) {
      player[i].otherMove()
    }
  }
}, 20)
 