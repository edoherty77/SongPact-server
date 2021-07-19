const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MessageSchema = new Schema({
  user: String,
  message: String,
  // timestamp: date.Now(),
})

const Message = mongoose.model('Message', MessageSchema)

module.exports = Message
