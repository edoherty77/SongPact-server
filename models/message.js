const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MessageSchema = new Schema({
  user: String,
  recipients: [
    {
      user: String,
    },
  ],
  content: [
    {
      message: String,
      user: String,
      date: String,
    },
  ],
})

const Message = mongoose.model('Message', MessageSchema)

module.exports = Message
