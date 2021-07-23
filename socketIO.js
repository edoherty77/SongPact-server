const http = require('http')
const ioLib = require('socket.io')
const db = require('./models')

module.exports = {
  setUpWebSocket: (app) => {
    const server = http.Server(app)
    const io = ioLib(server)

    io.on('connection', (socket) => {
      console.log('connected')
      socket.on('joinRoom', async (roomId) => {
        try {
          let currentRoom = await db.ChatRoom.findOne({ _id: roomId })
            .populate('messages')
            .exec()
          socket.join(roomId)
          socket.emit('joinRoom', currentRoom)
        } catch (error) {
          console.log(error)
        }
      })
      socket.on('leaveRoom', async ({ roomId }) => {
        try {
          socket.leave(roomId)
          console.log('A user left chatroom: ' + roomId)
        } catch (error) {
          console.log(error)
        }
      })
      socket.on('chatroomMessage', async ({ chatRoomInfo, messageInfo }) => {
        try {
          const createdMessage = await db.Message.create(messageInfo)
          await createdMessage.save()
          const foundChatRoom = await db.ChatRoom.findOne({
            _id: chatRoomInfo._id,
          })
          io.to(chatRoomInfo._id).emit('newMessage', messageInfo)
          await foundChatRoom.messages.push(createdMessage)
          await foundChatRoom.save()
        } catch (error) {
          console.log(error)
        }
      })
    })
    return server
  },
}
