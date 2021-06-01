const router = require('express').Router()
const ctrl = require('../controllers')
const passport = require('../passport')

//PATH = /api/v1/auth
router.post('/login', passport.authenticate('local'), ctrl.auth.login)
router.post('/register', ctrl.auth.register)
router.delete('/logout', ctrl.auth.logout)
//utility route -
router.get('/verify', ctrl.auth.verify)

module.exports = router
