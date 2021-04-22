const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PactSchema = new Schema({
  type: String,
  initBy: {
    user: String,
    status: Number,
  },
  sample: Boolean,
  recordLabel: Boolean,
  labelName: String,
  recordTitle: String,
  collaborators: [
    {
      user: String,
      status: Number,
    },
  ],
  users: [String],
  producer: {
    user: String,
    advancePercent: Number,
    publisherPercent: Number,
    royaltyPercent: Number,
    credit: String,
  },
  performers: [
    {
      user: String,
      publisherPercent: Number,
    },
  ],
})

const Pact = mongoose.model('Pact', PactSchema)

module.exports = Pact
