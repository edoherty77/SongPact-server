const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  artistName: String,
  companyName: String,
  address: String,
  city: String,
  state: String,
  zipCode: String,
  pacts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Pact',
    },
  ],
  email: String,
})

const User = mongoose.model('User', UserSchema)

module.exports = User
