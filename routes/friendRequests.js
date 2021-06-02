const router = require('express').Router()
const ctrl = require('../controllers')

// routes
router.get('/:id', ctrl.friendRequests.index)
// router.get('/:id', ctrl.categories.show)
router.post('/', ctrl.friendRequests.create)
router.put('/:id', ctrl.friendRequests.update)

// exports
module.exports = router
