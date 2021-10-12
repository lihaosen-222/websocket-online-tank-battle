import { io } from 'socket.io-client'
import { Player, player } from './object/player'

// 创建和删除DOM时用
const objectDOM = document.querySelector('.object')


if (ENV === 'development') {
  var socket = io('http://localhost:8001')
}
if (ENV === 'production') {
  var socket = io('http://81.68.226.188:8001')
}

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
    if (!player[i]) player.splice(i, 1);
    else break
  }
  console.log(player);
  // console.log(player);
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



export { socket }