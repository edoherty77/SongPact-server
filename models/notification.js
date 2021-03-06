const mongoose = require('mongoose')
const Schema = mongoose.Schema

const NotificationSchema = new Schema({
  pactId: String,
  text: String,
  initBy: String,
  recordTitle: String,
  pactStatus: Number,
  date: String,
})

const Notification = mongoose.model('Notification', NotificationSchema)

module.exports = Notification
