const mongoose = require('mongoose')
require('dotenv').config()

const connectionString =
  process.env.MONGO_URI || 'mongodb://localhost:27017/spact'
const configOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
}

mongoose
  .connect(connectionString, configOptions)
  .then(() => console.log('MongoDB successfully connected...'))
  .catch((err) => console.log(`MongoDB connection error: ${err}`))

module.exports = {
  User: require('./user'),
  Pact: require('./pact'),
  FriendRequest: require('./friendRequest'),
  Message: require('./message'),
}
