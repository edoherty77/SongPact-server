const mongoose = require('mongoose')
const Schema = mongoose.Schema

const FriendRequestSchema = new Schema({
  status: Number,
  requester: {
    type: String,
  },
  recipient: {
    type: String,
  },
})

const FriendRequest = mongoose.model('FriendRequest', FriendRequestSchema)

module.exports = FriendRequest
