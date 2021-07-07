const User = require('../models/user')

const LocalStrategy = require('passport-local').Strategy

const strategy = new LocalStrategy(
  //which field in the db is our 'username'
  { usernameField: 'email' },
  //callback function that verifies the user
  function (email, password, done) {
    //find a user thru the unique property - email
    User.findOne({ email: email }, (err, foundUser) => {
      //err handling
      if (err) return done(err)
      //no user is found
      if (!foundUser) return done(null, false, console.log('invalid creds'))
      //user is found but pw is fucked
      if (!foundUser.checkPassword(password))
        return done(null, false, console.log('wrong pw'))
      //return the user object
      return done(null, foundUser)
    })
  },
)

module.exports = strategy
