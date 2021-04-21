const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PactSchema = new Schema({
  type: String,
  initBy: String,
  sample: Boolean,
  recordLabel: Boolean,
  labelName: String,
  recordTitle: String,
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
})

const Pact = mongoose.model('Pact', PactSchema)

module.exports = Pact
