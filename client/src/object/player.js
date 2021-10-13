import { mouse } from './mouse'
import { keyboard } from './keyboard'

// 计算鼠标位置时用
const shellDOM = document.querySelector('.shell')


function Player() {
  this.name = false  // 没名字时才会要求加载名字
  this.angle = 0
  this.x = 300  // 中心的坐标
  this.y = 300
  this.dom = {}
}

Player.prototype.xLength = 20
Player.prototype.yLength = 20
Player.otherMove = function () {
  // 遍历player，改变玩家位姿
  for (let i = 1; i < player.length; i++) {
    // 排除当前客户端，且要求该player数据存在
    if (player[0].name !== i && player[i]) {
      player[i].dom.style.left = player[i].x - player[i].xLength / 2 + 'px'
      player[i].dom.style.top = player[i].y - player[i].yLength / 2 + 'px'
      const angle360 = player[i].angle / Math.PI / 2 * 360
      player[i].dom.children[1].style.transform = `rotate(${angle360}deg)`
    }
  }
}

const player = [] // 全部玩家的信息

// 当前客户的信息
player[0] = new Player()
player[0].speed = 2
player[0].toMouse = 0     // 客户到鼠标的距离
player[0].dom = document.querySelector('.player')
player[0].setAngle = function () {
  mouse.x = mouse.pageX - shellDOM.offsetLeft
  mouse.y = mouse.pageY - shellDOM.offsetTop

  let xDiff = mouse.x - this.x     // 换算到方块中心
  const yDiff = mouse.y - this.y

  player[0].toMouse = Math.sqrt(xDiff * xDiff + yDiff * yDiff) // 计算出距离，之后要用

  // 角度换算
  let angle = Math.atan(yDiff / xDiff)
  if (xDiff < 0) angle = angle + Math.PI
  this.angle = angle
  const angle360 = angle / Math.PI / 2 * 360
  player[0].dom.children[1].style.transform = `rotate(${angle360}deg)`
}

player[0].move = function () {
  let speed = 0 
  
  // 阻止在鼠标附近抖动
  if (this.toMouse < 1) speed = 0 // 过小就不移动了
  else {
    if (this.speed > this.toMouse) speed = this.toMouse - 0.5 
    // 并不需要刚好等于，分母为零会出问题，角度也会乱
    else speed = this.speed
  }

  const xDiff = speed * Math.cos(this.angle) // 移动直径2px
  const yDiff = speed * Math.sin(this.angle)
  let xTo = this.x + xDiff
  let yTo = this.y + yDiff

  // 如果要下次移动要超过边界，直接移动到边界位置
  if (xTo < 0 || xTo > 600) {
    if (xTo < 0) xTo = 0
    else xTo = 600
  }
  if (yTo < 0 || yTo > 600) {
    if (yTo < 0) yTo = 0
    else yTo = 600
  }

  this.x = xTo
  this.y = yTo

  this.dom.style.left = xTo - this.xLength / 2 + 'px'   // 根据边长换算出left和top
  this.dom.style.top = yTo - this.yLength / 2 + 'px'
}

player[0].dash = function () {
  player[0].speed = 10
  player[0].move()
  player[0].speed = 2
}

// 发送关键数据给服务器
player[0].send = function () {
  // 返回关键信息
  return {
    name: player[0].name,
    x: player[0].x,
    y: player[0].y,
    angle: player[0].angle
  }
}

player[0].action = function () {
  player[0].setAngle()
  if (keyboard.a.isDown) player[0].dash()
  else if (keyboard.space.isDown) player[0].move()
}

export { Player, player }