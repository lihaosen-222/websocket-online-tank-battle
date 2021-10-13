import { io } from 'socket.io-client'
import { keyboard } from './object/keyboard'
import { mouseKey } from './object/mouse'
import { Player, player, thisPlayer } from './object/player'

if (ENV === 'development') {
  var socket = io('http://localhost:8001')
}
if (ENV === 'production') {
  var socket = io('http://81.68.226.188:8001')
}


function socketInit() {
  // 创建和删除DOM时用
  const objectDOM = document.querySelector('.object')
  socket.on('sign-in', name => {
    // 若还没创建，则自己占用名字
    if (thisPlayer.name === undefined) {
      thisPlayer.name = name
      thisPlayer.dom.children[0].innerHTML = name
    }
  })

  // 登出信息，在这删除DOM
  socket.on('sign-out', name => {
    removePlayer(name)
  })

  // 群发信息，创建DOM，更新位姿
  socket.on('all-player', data => {
    for (let i = 0; i < data.length; i++) {
      if (!player[i]) { // data长度超过player，且为undefined，创建新的对象
        player[i] = new Player()
        if (thisPlayer.name !== data[i].name) { 
          // 处理除了thisPlayer以外的，创建他们的DOM
          const li = document.createElement('li')
          li.className = 'player'
          const span = document.createElement('span')
          const dir = document.createElement('div')
          span.innerHTML = data[i].name
          dir.className = 'dir'
          li.appendChild(span)
          li.appendChild(dir)
          objectDOM.appendChild(li)
          player[i].dom = li
        } else {
          player[i].dom = thisPlayer.dom
        }
        player[i].name = data[i].name  // 到时候再改吧
      }

      // 赋位姿信息
      player[i].x = data[i].x
      player[i].y = data[i].y
      player[i].angle = data[i].angle
    }
  })

  socket.on('shot-down', name => {
    if(thisPlayer.name === name) {
      alert('you are shotted down, 刷新再次加入战斗')
      thisPlayer.isShot = true
    }
    removePlayer(name)
  })

  function removePlayer(name) {
    for (let i = 0; i < player.length; i++) {
      if (player[i].name === name) {
        console.log(player);
        objectDOM.removeChild(player[i].dom)
        player.splice(i, 1)
        break
      }
    }
  }
}

export { socket, socketInit }