const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ChatRoomSchema = new Schema({
  members: [
    {
      user: String,
      name: String,
    },
  ],
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Message',
    },
  ],
})

const ChatRoom = mongoose.model('ChatRoom', ChatRoomSchema)

module.exports = ChatRoom
