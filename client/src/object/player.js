import { mouse } from './mouse'

// 计算鼠标位置时用
const shellDOM = document.querySelector('.shell')


function Player() {
  this.name = false  // 没名字时才会要求加载名字
  this.angle = 0
  this.x = 300
  this.y = 300
  this.dom = {}
}

Player.prototype.otherMove = function () {
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
player[0].setAngle = function () {
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
  if (yTo < 0 || yTo > 580) {
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
  // 返回关键信息
  return {
    name: player[0].name,
    x: player[0].x,
    y: player[0].y,
    angle: player[0].angle
  }
}


export { Player, player }