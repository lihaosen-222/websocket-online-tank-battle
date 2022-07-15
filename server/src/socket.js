function socketInit(server) {
  const io = require("socket.io")(server, { cors: true }) //scocket.io允许跨域
  const gameState = {}
  let coreTimer

  io.on("connection", (socket) => {
    coreTimer = refreshTimerWhenStart(gameState, coreTimer)
    gameState[socket.id] = {}

    socket.on("singleState", (state) => {
      if (gameState[socket.id]) gameState[socket.id] = state
    })

    socket.on("kill", (id) => {
      delete gameState[id]
      coreTimer = refreshTimerWhenLeave(gameState, coreTimer)
    })

    socket.on("disconnect", () => {
      delete gameState[socket.id]
      coreTimer = refreshTimerWhenLeave(gameState, coreTimer)
    })
  })
}

function refreshTimerWhenStart(gameState, coreTimer) {
  if (!Object.keys(gameState).length) {
    return (coreTimer = setInterval(function () {
      io.emit("gameState", gameState)
    }, 20))
  } else {
    return coreTimer
  }
}

function refreshTimerWhenLeave(gameState, coreTimer) {
  if (!Object.keys(gameState).length) {
    return clearInterval(coreTimer) // 清空后返回的是 undefined
  } else {
    return coreTimer
  }
}

module.exports = socketInit