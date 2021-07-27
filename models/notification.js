const mongoose = require('mongoose')
const Schema = mongoose.Schema

const NotificationSchema = new Schema({
  friendRequest: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'friendRequests',
  },
})

const Notification = mongoose.model('Notification', NotificationSchema)

module.exports = Notification
