const express = require("express")
const app = express()
const http = require("http")
const server = http.createServer(app)
const socketInit = require("./socket")

socketInit(server)
app.use("/", express.static("./static"))

const expressPort = 3007
server.listen(expressPort, () => {
  if (process.env.NODE_ENV == "development") {
    console.log(`start at http://localhost:${expressPort}/`)
  }
  if (process.env.NODE_ENV == "production") {
    console.log(`start at http://81.68.226.188:${expressPort}/`)
  }
})