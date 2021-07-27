const mongoose = require('mongoose')
const Schema = mongoose.Schema

const NotificationSchema = new Schema({
  pactCreated: {
    pactId: String,
    initBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
})

const Notification = mongoose.model('Notification', NotificationSchema)

module.exports = Notification
