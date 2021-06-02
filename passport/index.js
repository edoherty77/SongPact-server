const passport = require('passport')
const LocalStrategy = require('./localStrategy')
const User = require('../models/user')

//is called on login, this function uses the logged in user id to a session thru req.session
passport.serializeUser((user, done) => {
  console.log('serialize is getting called')
  done(null, user._id)
})

//this function is called anytime a logged in user makes a request to the application
//passport adds the user info to req.user and we can use that to verify the authenticated user
passport.deserializeUser((id, done) => {
  //look for user by their id, reutrn a user object containing only their email
  User.findById(id, 'email', (err, user) => {
    if (err) return done(err, null)
    done(null, user)
  })
})

passport.use(LocalStrategy)

module.exports = passport
