const http = require('http')
const ioLib = require('socket.io')

module.exports = {
  setUpWebSocket: (app) => {
    const server = http.Server(app)
    const io = ioLib(server)

    io.on('connection', (socket) => {
      console.log('ayyyy')
    })
    return server
  },
}
