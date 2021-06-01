const db = require('../models')
const bcrypt = require('bcrypt')

const register = (req, res) => {
  // validate the POSTed data - making sure we have a name, an email, a pw
  const body = JSON.parse(req.body.body)
  const { firstName, lastName, email, password } = body

  if (!firstName || !lastName || !email || !password) {
    return res.json({
      message: 'Please enter a name, an email, and a password',
    })
  }

  // make sure the user doesn't already exist
  db.User.findOne({ email: email }, (err, foundUser) => {
    if (err)
      return res.json({
        message: 'Something went wrong',
      })

    if (foundUser)
      return res.json({
        message: 'A user with that email already exists',
      })

    // if the user doesnt exist, create and save a user to the DB
    const newUser = new db.User({
      firstName,
      lastName,
      email,
      password,
    })

    newUser.save((err, savedUser) => {
      if (err) res.json(err)
      res.json(savedUser)
    })
  })
}

const login = (req, res) => {
  console.log('yoooo')
  console.log('req.user here >>>>>>>>>>>', req.user)
  console.log('req.session here >>>>>>>>>>>', req.session)

  res.json({ user: req.user })
}

const logout = (req, res) => {}

//utility function for developer use only
const verify = (req, res) => {}

module.exports = {
  login,
  register,
  logout,
  verify,
}
