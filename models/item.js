const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ItemSchema = new Schema({
  title: String,
  // imageUrl: String,
  email: String,
  description: String,
  // price: Number,
  // category: String,
})

const Item = mongoose.model('Item', ItemSchema)

module.exports = Item
