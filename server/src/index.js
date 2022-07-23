const express = require("express")
const app = express()
const http = require("http")
const server = http.createServer(app)
const socketInit = require("./socket")

socketInit(server)
app.use("/", express.static("./static"))

const expressPort = 8006
server.listen(expressPort, () => {
  console.log(`start at ${expressPort}`)
})
