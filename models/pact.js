const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PactSchema = new Schema({
  status: Number,
  type: String,
  initBy: {
    user: String,
    status: Number,
    firstName: String,
    lastName: String,
    signatureImg: String,
  },
  sample: Boolean,
  recordLabel: Boolean,
  labelName: String,
  recordTitle: String,
  collaborators: [
    {
      user: String,
      status: Number,
      firstName: String,
      lastName: String,
      signatureImg: String,
    },
  ],
  users: [String],
  producer: {
    user: String,
    firstName: String,
    lastName: String,
    advancePercent: Number,
    publisherPercent: Number,
    royaltyPercent: Number,
    credit: String,
    signatureImg: String,
    artistName: String,
    companyName: String,
    address: String,
    city: String,
    state: String,
    zipCode: String,
    email: String,
  },
  performers: [
    {
      user: String,
      publisherPercent: Number,
      firstName: String,
      lastName: String,
      signatureImg: String,
      artistName: String,
      companyName: String,
      address: String,
      city: String,
      state: String,
      zipCode: String,
      email: String,
    },
  ],
})

const Pact = mongoose.model('Pact', PactSchema)

module.exports = Pact
