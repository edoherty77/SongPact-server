const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MessageSchema = new Schema({
  user: String,
  name: String,
  message: String,
  timestamp: String,
})

const Message = mongoose.model('Message', MessageSchema)

module.exports = Message
