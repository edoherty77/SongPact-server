const router = require('express').Router()
const ctrl = require('../controllers')

// routes
router.get('/', ctrl.friendRequests.index)
// router.get('/:id', ctrl.categories.show)
router.post('/', ctrl.friendRequests.create)

// exports
module.exports = router
